'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/Button';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Simulation d'envoi
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Message envoyé avec succès! ✨');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Erreur lors de l\'envoi du message');
    } finally {
      setLoading(false);
    }
  };

  const contacts = [
    {
      icon: Mail,
      label: 'Email',
      value: 'support@agri-match.ci',
      color: 'from-blue-400 to-blue-600',
    },
    {
      icon: Phone,
      label: 'Téléphone',
      value: '+225 07 12 34 56',
      color: 'from-green-400 to-green-600',
    },
    {
      icon: MapPin,
      label: 'Adresse',
      value: 'Abidjan, Côte d\'Ivoire',
      color: 'from-orange-400 to-orange-600',
    },
    {
      icon: Clock,
      label: 'Heures',
      value: 'Lun-Ven: 8h-18h (GMT+0)',
      color: 'from-purple-400 to-purple-600',
    },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        {/* Hero */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">Nous Contacter</h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Une question? Une suggestion? Contactez-nous et nous répondrons dans les 24 heures
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8 mb-16">
              {contacts.map((contact, index) => {
                const Icon = contact.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card hover>
                      <CardBody className="text-center space-y-4">
                        <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${contact.color} flex items-center justify-center text-white text-2xl mx-auto`}>
                          <Icon />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{contact.label}</p>
                          <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">{contact.value}</p>
                        </div>
                      </CardBody>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <Card>
                  <CardHeader>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <MessageSquare className="text-primary-600" />
                      Envoyez-nous un message
                    </h2>
                  </CardHeader>
                  <CardBody>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <Input
                        label="Nom complet"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Votre nom"
                        required
                      />
                      <Input
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="votre@email.com"
                        required
                      />
                      <Input
                        label="Téléphone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+225 07 12 34 56"
                      />
                      <Input
                        label="Sujet"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Sujet de votre message"
                        required
                      />
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Message
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Votre message..."
                          rows={5}
                          required
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <Button
                        type="submit"
                        loading={loading}
                        size="lg"
                        className="w-full gap-2"
                      >
                        <Send className="w-4 h-4" />
                        Envoyer le message
                      </Button>
                    </form>
                  </CardBody>
                </Card>
              </motion.div>

              {/* Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <Card>
                  <CardBody>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">À Propos d'Agri-Match</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Agri-Match CI est la plateforme de mise en relation agricole la plus innovante de Côte d'Ivoire.
                      Nous connectons producteurs et acheteurs avec intelligence artificielle.
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      Notre mission: Transformer l'agriculture en Afrique de l'Ouest grâce à la technologie.
                    </p>
                  </CardBody>
                </Card>

                <Card>
                  <CardBody>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Horaires de Support</h3>
                    <div className="space-y-2 text-gray-600 dark:text-gray-400">
                      <p>🏢 <strong>Lundi - Vendredi:</strong> 8h00 - 18h00</p>
                      <p>📞 <strong>Support 24/7:</strong> Chat en direct disponible</p>
                      <p>📧 <strong>Email:</strong> Réponse dans 24h</p>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
