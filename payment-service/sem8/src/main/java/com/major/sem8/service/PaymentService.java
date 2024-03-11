package com.major.sem8.service;

import com.major.sem8.dto.RazorpayResponse;
import com.major.sem8.entity.Ticket;
import com.major.sem8.entity.Payment;
import com.major.sem8.entity.PaymentStatus;
import com.major.sem8.exception.ApplicationException;
import com.major.sem8.repository.PaymentRepository;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.Utils;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;

@Service
public class PaymentService {

    private String keyId = "rzp_test_AjGTpXkvEWOhYO";

    private String secret = "Aw1K3ynU5jslonf2aT3H4FVa";

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private KafkaTemplate kafkaTemplate;

    private static Logger LOG = LoggerFactory.getLogger(PaymentService.class);

    public void createOrderWithRazorpay(Ticket ticket) throws RazorpayException {
        RazorpayClient razorpayClient = new RazorpayClient(keyId,secret);
        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", ticket.getPrice().intValue()*100);
        orderRequest.put("currency", "INR");
        orderRequest.put("receipt", "order_receipt_11");
        try {
            Order order = razorpayClient.orders.create(orderRequest);
            String orderId = order.get("id");
            Payment paymentDetails = new Payment();
            paymentDetails.setRazorpayOrderId(orderId);
            paymentDetails.setTicketId(ticket.getTicketId());
            paymentDetails.setPaymentStatus(PaymentStatus.PENDING.name());
            paymentDetails.setPrice(ticket.getPrice());
            paymentRepository.save(paymentDetails);
        }catch (Exception e){
            throw new ApplicationException("ERROR WHILE GETTING ORDERID FROM RAZORPAY", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    public String verifyPayment(RazorpayResponse razorpayResp) throws RazorpayException {

//      System.out.println(razrorpayResp);
        JSONObject json = new JSONObject();
        System.out.println(json);
        json.put("razorpay_payment_id", razorpayResp.getRazorpay_payment_id());
        json.put("razorpay_order_id", razorpayResp.getRazorpay_order_id());
        json.put("razorpay_signature", razorpayResp.getRazorpay_signature());
        boolean res = Utils.verifyPaymentSignature(json, secret);
        if (res) {
            Payment payment = paymentRepository.findByRazorpayOrderId(razorpayResp.getRazorpay_order_id())
                    .orElseThrow(() -> new ApplicationException("ORDERID DOESN'T EXISIT",HttpStatus.BAD_REQUEST));
            payment.setPaymentStatus(PaymentStatus.SUCCESSFUL.name());

            publishPaymentEvent(payment);

            return "Successfully Verified";
        } else {
            throw new ApplicationException("UNAUTHORIZED ACCESS",HttpStatus.BAD_REQUEST);
        }

    }

    private void publishPaymentEvent(Payment payment){
        CompletableFuture<SendResult<String, Payment>> result = kafkaTemplate
                .send("payment-event", payment);
        result.whenComplete((sr, ex) ->
                LOG.debug("Sent(key={},partition={}): {}",
                        sr.getProducerRecord().partition(),
                        sr.getProducerRecord().key(),
                        sr.getProducerRecord().value()));
    }

    public Payment getOrderId(String ticketId) {

        for (int i = 0; i < 180; i++) {
            try {
                // Simulate database check
                Thread.sleep(1000);
                // If new data is found, send it to the client
                Payment order = isNewDataAvailable(ticketId);
                if (order != null) {
                    return order;
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }
        throw new ApplicationException("error while getting orderId",HttpStatus.INTERNAL_SERVER_ERROR);
    }

    protected Payment isNewDataAvailable(String ticketId){
        Payment payment = paymentRepository.findByTicketId(ticketId);
        if(payment != null){
            return payment;
        }else{
            return null;
        }
    }
}
