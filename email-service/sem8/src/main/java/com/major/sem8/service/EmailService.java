package com.major.sem8.service;

import com.major.sem8.entity.Ticket;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;


@Service
public class EmailService {

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private TemplateEngine templateEngine;

    public void sendEmail(Ticket ticket) throws MessagingException {

        MimeMessage mimeMessage = javaMailSender.createMimeMessage();

        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage,true);

        Context context = new Context();

        try {
            context.setVariable("ticket",ticket);

            String emailContent = templateEngine.process("TicketConfirmationTemplate",context);

            mimeMessageHelper.setFrom(fromEmail);
            mimeMessageHelper.setTo(ticket.getEmail());
            mimeMessageHelper.setSubject("Ticket Confirmation From GHUMANTU");
            mimeMessageHelper.setText(emailContent,true);

            javaMailSender.send(mimeMessage);
        }catch (Exception e){
            throw new RuntimeException("error while sending email");
        }
    }
}
