import React, { useState } from 'react'; // Added useState
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Linkedin } from 'lucide-react'; // Added Linkedin
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast'; // Added toast import

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://submit-form.com/kFZXemICv", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept": "application/json", 
        },
        body: new URLSearchParams(formData).toString(),
      });

      if (response.ok) {
        toast({
          title: "Message sent!",
          description: "Thank you for your message. I'll get back to you soon.",
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        const errorData = await response.json().catch(() => ({ message: "An unknown error occurred." }));
        toast({
          title: "Error sending message",
          description: errorData.message || "Please try again later.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "A network error occurred. Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-primary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-accent">Get In Touch</h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-4"></div>
          <p className="text-lg text-accent/80 max-w-2xl mx-auto">
            Have a project in mind or want to chat? Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <form 
              onSubmit={handleSubmit} // Changed from action/method
              className="bg-accent rounded-lg p-6 md:p-8 shadow-lg"
            >
              <h3 className="text-2xl font-bold mb-6 text-primary">Send Me a Message</h3>
              
              <div className="space-y-4">
                <div>
                  <Input
                    name="name"
                    value={formData.name} // Added value
                    onChange={handleChange} // Added onChange
                    placeholder="Your Name"
                    required
                    className="bg-white border-primary/20"
                  />
                </div>
                <div>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email} // Added value
                    onChange={handleChange} // Added onChange
                    placeholder="Your Email"
                    required
                    className="bg-white border-primary/20"
                  />
                </div>
                <div>
                  <Input
                    name="subject"
                    value={formData.subject} // Added value
                    onChange={handleChange} // Added onChange
                    placeholder="Subject"
                    required
                    className="bg-white border-primary/20"
                  />
                </div>
                <div>
                  <Textarea
                    name="message"
                    value={formData.message} // Added value
                    onChange={handleChange} // Added onChange
                    placeholder="Your Message"
                    required
                    className="bg-white border-primary/20 h-32"
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={isSubmitting} // Added disabled
                  className="w-full bg-primary text-accent hover:bg-primary/90"
                >
                  {isSubmitting ? 'Sending...' : ( // Added conditional text
                    <span className="flex items-center justify-center">
                      Send Message <Send size={16} className="ml-2" />
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 md:p-8">
              <h3 className="text-2xl font-bold mb-6 text-accent">Contact Information</h3>
              
              <div className="space-y-6">
                <a 
                  href="mailto:dorindeacu@gmail.com"
                  className="flex items-start group"
                >
                  <div className="bg-accent/10 group-hover:bg-accent/20 p-3 rounded-full mr-4 transition-colors">
                    <Mail className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-accent group-hover:text-white transition-colors">Email</h4>
                    <p className="text-accent/80 group-hover:text-white/90 transition-colors">dorindeacu@gmail.com</p>
                  </div>
                </a>
                
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Copenhagen" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-start group"
                >
                  <div className="bg-accent/10 group-hover:bg-accent/20 p-3 rounded-full mr-4 transition-colors">
                    <MapPin className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-accent group-hover:text-white transition-colors">Location</h4>
                    <p className="text-accent/80 group-hover:text-white/90 transition-colors">Copenhagen, DK</p>
                  </div>
                </a>
              </div>
              
              <div className="mt-10">
                <h4 className="text-lg font-semibold text-accent mb-3">Follow Me</h4>
                <div className="flex space-x-4">
                  <a 
                    href="https://www.linkedin.com/in/dorin-deacu/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-accent/10 hover:bg-accent/20 p-3 rounded-full transition-colors"
                  >
                    <Linkedin className="h-5 w-5 text-accent" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
