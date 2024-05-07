"use client";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string } from "zod";

import emailjs from "@emailjs/browser";

// components
import TitleComponent from "@/components/common/Title";

// バリデーションスキーマ
const validationSchema = object({
  name: string().min(1, "Name is required").max(50, "Name is too long"),
  email: string().email("Invalid email address").max(50, "Email is too long"),
  subject: string()
    .min(1, "Subject is required")
    .max(500, "Subject is too long"),
  message: string()
    .min(1, "Message is required")
    .max(1000, "Message is too long"),
});

// フォームデータの型定義
interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(validationSchema),
  });
  const formRef = useRef<HTMLFormElement>(null);
  // Email 送信の状態管理
  const [isSending, setIsSending] = useState(false);
  // メール送信処理
  const sendEmail = async (data: FormData) => {
    const { serviceID, templateID, userID } = {
      serviceID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      templateID: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      userID: process.env.NEXT_PUBLIC_EMAILJS_USER_ID,
    };
    try {
      const result = await emailjs.sendForm(
        serviceID!,
        templateID!,
        formRef.current!,
        userID!,
      );
      console.log(result.text);
      formRef.current!.reset();
      setIsSending(true);
    } catch (error: any) {
      console.error("Email sending error:", error.text);
    }
  };

  return (
    <section className="max-w-4xl mx-auto p-6 shadow-lg my-12 ">
      {/* <TitleComponent>Contact Us</TitleComponent> */}
      {!isSending ? (
        <form
          ref={formRef}
          onSubmit={handleSubmit(sendEmail)}
          className="space-y-4 "
        >
          {/* Name */}
          <label htmlFor="inputName" className="form_label">
            Name:
          </label>
          <input
            type="text"
            placeholder="Your Name"
            {...register("name")}
            className="form_input"
          />
          {errors.name && <p className="form_error">{errors.name.message}</p>}
          {/* Email */}
          <label htmlFor="inputEmail" className="form_label">
            Email:
          </label>
          <input
            type="email"
            placeholder="Your Email"
            {...register("email")}
            className="form_input"
          />
          {errors.email && <p className="form_error">{errors.email.message}</p>}
          {/* Subject */}
          <label htmlFor="inputSubject" className="form_label">
            Subject:
          </label>
          <input
            type="text"
            placeholder="Subject"
            {...register("subject")}
            className="form_input"
          />
          {errors.subject && (
            <p className="form_error">{errors.subject.message}</p>
          )}
          {/* Message */}
          <label htmlFor="inputMessage" className="form_label">
            Message:
          </label>
          <textarea
            placeholder="Your Message"
            {...register("message")}
            className="form_textarea"
          />
          {errors.message && (
            <p className="form_error">{errors.message.message}</p>
          )}
          {/* Submit */}
          <button
            type="submit"
            className="bg-AccentBg w-[60%] text-3xl mx-auto d-block py-2 hover:opacity-80 transition-all max-[480px]:text-xl"
          >
            Send Message
          </button>
        </form>
      ) : (
        <div className="text-center">
          <p className="text-3xl">Thank you for your message!</p>
          <p className="text-2xl">
            We will get back to you as soon as possible.
          </p>
        </div>
      )}
    </section>
  );
}
