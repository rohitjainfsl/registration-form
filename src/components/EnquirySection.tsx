import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Phone, Mail, MapPin, CheckCircle } from "lucide-react";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  phone: z.string().trim().min(10, "Enter a valid phone number").max(15),
  email: z.string().trim().email("Enter a valid email").max(255),
  course: z.string().min(1, "Select a course"),
  message: z.string().trim().max(500).optional(),
});

type FormData = z.infer<typeof schema>;

const courseOptions = [
  "Full Stack Developer",
  "MERN Stack",
  ".NET Developer",
  "UI/UX Designer",
  "Graphic Designer",
  "Data Analytics",
  "Python Development",
  "Digital Marketing",
];

const EnquirySection = () => {
  const [form, setForm] = useState<FormData>({ name: "", phone: "", email: "", course: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormData, string>> = {};
      result.error.errors.forEach((err) => {
        const key = err.path[0] as keyof FormData;
        fieldErrors[key] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="contact" className="section-padding bg-background">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-lg mx-auto text-center rounded-2xl border border-border bg-card p-12">
          <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
          <h3 className="font-display text-2xl font-bold text-foreground mb-2">Thank You!</h3>
          <p className="text-muted-foreground">Our counselor will contact you shortly. Get ready to start your tech career!</p>
        </motion.div>
      </section>
    );
  }

  const inputClass = "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all";

  return (
    <section id="contact" className="section-padding bg-background">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <span className="text-sm font-semibold text-secondary uppercase tracking-wider">Get In Touch</span>
          <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold text-foreground">
            Start Your <span className="gradient-text">Journey Today</span>
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Our expert counselors will guide you to the right career path. Get a free consultation and personalized learning roadmap.
          </p>

          <div className="mt-8 space-y-5">
            {[
              { Icon: Phone, text: "+91 98765 43210" },
              { Icon: Mail, text: "admissions@technestacademy.com" },
              { Icon: MapPin, text: "Tech Park, Sector 62, Noida, India" },
            ].map(({ Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm text-foreground">{text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right - Form */}
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-8 shadow-lg space-y-5">
            <div>
              <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" className={inputClass} />
              {errors.name && <p className="mt-1 text-xs text-urgent">{errors.name}</p>}
            </div>
            <div>
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" className={inputClass} />
              {errors.phone && <p className="mt-1 text-xs text-urgent">{errors.phone}</p>}
            </div>
            <div>
              <input name="email" value={form.email} onChange={handleChange} placeholder="Email Address" className={inputClass} />
              {errors.email && <p className="mt-1 text-xs text-urgent">{errors.email}</p>}
            </div>
            <div>
              <select name="course" value={form.course} onChange={handleChange} className={inputClass}>
                <option value="">Select Course</option>
                {courseOptions.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              {errors.course && <p className="mt-1 text-xs text-urgent">{errors.course}</p>}
            </div>
            <div>
              <textarea name="message" value={form.message} onChange={handleChange} placeholder="Your Message (optional)" rows={3} className={inputClass} />
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" /> Request Callback
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default EnquirySection;
