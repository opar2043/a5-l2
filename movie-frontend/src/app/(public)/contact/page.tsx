"use client";

import React, { useState } from "react";
import {
  Mail, User, MessageSquare, Phone, MapPin, Globe,
  Clock, Send, CheckCircle2, Film,
} from "lucide-react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSubmitted(true);
  };

  return (
    <main className="bg-white overflow-hidden">


      {/* ── FORM + INFO ── */}
      <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* ── LEFT: Form ── */}
          <div className="bg-white rounded-md shadow-xl border border-slate-100 p-8 sm:p-10">
            <p className="text-[#D96C2C] text-xs font-bold uppercase tracking-widest mb-2">Send a Message</p>
            <h2 className="text-slate-900 font-black text-2xl sm:text-3xl mb-8">We'll Get Back To You</h2>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-slate-800 font-bold text-xl">Message Sent!</h3>
                <p className="text-slate-500 text-sm max-w-xs">
                  Thanks for reaching out, {form.name}. We'll reply to <span className="text-[#D96C2C]">{form.email}</span> within 24 hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                  className="mt-2 text-sm text-[#D96C2C] font-semibold hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                {/* Name */}
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your Full Name"
                    className="w-full pl-11 pr-4 py-3.5 rounded-md border border-slate-200 bg-slate-50 text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#D96C2C] focus:ring-2 focus:ring-[#D96C2C]/10 transition-all duration-200"
                  />
                </div>

                {/* Email */}
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Your Email Address"
                    className="w-full pl-11 pr-4 py-3.5 rounded-md border border-slate-200 bg-slate-50 text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#D96C2C] focus:ring-2 focus:ring-[#D96C2C]/10 transition-all duration-200"
                  />
                </div>

                {/* Subject */}
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3.5 rounded-md border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:border-[#D96C2C] focus:ring-2 focus:ring-[#D96C2C]/10 transition-all duration-200 appearance-none cursor-pointer"
                  >
                    <option value="">Select a Subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="ticket">Ticket Support</option>
                    <option value="partnership">Partnership</option>
                    <option value="career">Career</option>
                    <option value="press">Press & Media</option>
                  </select>
                </div>

                {/* Message */}
                <div className="relative">
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Write your message here..."
                    className="w-full px-4 py-3.5 rounded-md border border-slate-200 bg-slate-50 text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#D96C2C] focus:ring-2 focus:ring-[#D96C2C]/10 transition-all duration-200 resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  onClick={handleSubmit}
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#D96C2C] hover:bg-[#c05f24] text-white font-bold text-sm tracking-widest uppercase rounded-md transition-all duration-200 shadow hover:shadow-lg hover:shadow-[#D96C2C]/20 hover:scale-[1.02] active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </div>
            )}
          </div>

          {/* ── RIGHT: Contact Info ── */}
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-[#D96C2C] text-xs font-bold uppercase tracking-widest mb-2">Contact Information</p>
              <h2 className="text-slate-900 font-black text-2xl sm:text-3xl mb-4">
                Reach Out Anytime
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed">
                Whether you're looking to partner with us, need support with your tickets,
                or simply want to learn more about what we do — our team is here and happy to help.
              </p>
            </div>

            {/* Info cards */}
            <div className="flex flex-col gap-4">

              {/* Phone */}
              <div className="flex items-start gap-4 p-5 rounded-md border border-slate-100 bg-slate-50 hover:border-[#D96C2C]/30 hover:shadow-sm transition-all duration-200">
                <div className="w-11 h-11 rounded-md bg-[#D96C2C] text-white flex items-center justify-center shrink-0 shadow">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-slate-800 font-bold text-sm mb-0.5">Contact Number</p>
                  <p className="text-slate-500 text-sm">+1 (800) 123-4567</p>
                  <p className="text-slate-500 text-sm">+1 (800) 765-4321</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4 p-5 rounded-md border border-slate-100 bg-slate-50 hover:border-[#D96C2C]/30 hover:shadow-sm transition-all duration-200">
                <div className="w-11 h-11 rounded-md bg-[#D96C2C] text-white flex items-center justify-center shrink-0 shadow">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-slate-800 font-bold text-sm mb-0.5">Our Address</p>
                  <p className="text-slate-500 text-sm">350 Fifth Avenue, Suite 4000</p>
                  <p className="text-slate-500 text-sm">New York, NY 10118</p>
                </div>
              </div>

              {/* Country */}
              <div className="flex items-start gap-4 p-5 rounded-md border border-slate-100 bg-slate-50 hover:border-[#D96C2C]/30 hover:shadow-sm transition-all duration-200">
                <div className="w-11 h-11 rounded-md bg-[#D96C2C] text-white flex items-center justify-center shrink-0 shadow">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-slate-800 font-bold text-sm mb-0.5">Country</p>
                  <p className="text-slate-500 text-sm">United States</p>
                  <p className="text-slate-500 text-sm">Operating in 40+ countries worldwide</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4 p-5 rounded-md border border-slate-100 bg-slate-50 hover:border-[#D96C2C]/30 hover:shadow-sm transition-all duration-200">
                <div className="w-11 h-11 rounded-md bg-[#D96C2C] text-white flex items-center justify-center shrink-0 shadow">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-slate-800 font-bold text-sm mb-0.5">Working Hours</p>
                  <p className="text-slate-500 text-sm">Mon – Fri: 9:00 AM – 6:00 PM</p>
                  <p className="text-slate-500 text-sm">Sat – Sun: 10:00 AM – 4:00 PM</p>
                </div>
              </div>
            </div>

            {/* Social */}
            <div>
              <p className="text-slate-700 font-bold text-sm mb-3">Follow Us</p>
              <div className="flex items-center gap-3">
                {[
                  { icon: <FaFacebookF className="w-3.5 h-3.5" />, label: "Facebook" },
                  { icon: <FaTwitter className="w-3.5 h-3.5" />, label: "Twitter" },
                  { icon: <FaInstagram className="w-3.5 h-3.5" />, label: "Instagram" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href="#"
                    aria-label={s.label}
                    className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#D96C2C] hover:border-[#D96C2C] transition-all duration-200"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAP ── */}
      <section className="px-4 sm:px-8 pb-20 max-w-7xl mx-auto">
        <div className="rounded-md overflow-hidden shadow-xl border border-slate-100 h-[420px] relative">
          {/* Google Maps embed — New York */}
          <iframe
            title="Our Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215209040437!2d-73.9856644!3d40.7484405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1700000000000"
            width="100%"
            height="100%"
            style={{ border: 0, filter: "grayscale(20%)" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          {/* Map overlay card */}
          <div className="absolute bottom-5 left-5 bg-white rounded-md shadow-lg px-5 py-4 flex items-start gap-3 border border-slate-100">
            <div className="w-9 h-9 rounded-md bg-[#D96C2C] flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-slate-800 font-bold text-sm">Movies Ok HQ</p>
              <p className="text-slate-500 text-xs">350 Fifth Ave, New York, NY</p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}