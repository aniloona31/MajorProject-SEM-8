package com.major.sem8.repository;

import com.major.sem8.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment,Long> {
    Optional<Payment> findByRazorpayOrderId(String razorpay_order_id);
}
