'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { CheckCircle, Users, TrendingUp, Globe, Award, Heart } from 'react-icons/fa';

export default function About() {
  const [activeTab, setActiveTab] = useState('mission');

  const values = [
    {
      icon: Heart,
      title: 'Passion',
      description: 'Passionnés par l\'agriculture et l\'innovation',
    },
    {
      icon: Users,
      title: 'Communauté',
      description: 'Construire une communauté d\'agriculteurs prospères',
    },
    {
      icon: TrendingUp,
      title: 'Croissance',
      description: 'Accélérer la croissance des producteurs africains',
    },
    {
      icon: Globe,
      title: 'Durabilité',
      description: 'Agriculture durable et responsable',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Qualité et excellence en tout ce que nous faisons',
    },
    {
      icon: CheckCircle,
      title: 'Intégrité',
      description: 'Transparence et honnêteté dans les transactions',
    },
  ];

  const milestones = [
    { year: '2024', event: '🚀 Lancement d\'Agri-Match', desc: 'Première plateforme agricole avec IA' },
    { year: '2024', event: '📱 Mobile App', desc: 'Application mobile native lancée' },
    { year: '2024', event: '🌍 Expansion', desc: 'Partenariats internationaux signés' },
    { year: '2025', event: '🏆 Récompenses', desc: 'Awards de la meilleure startup agritech' },
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
              className="text-center"
            >
              <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">À Propos d'Agri-Match</h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Transformez l'agriculture africaine avec l'intelligence artificielle et la technologie.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {[
                {
                  title: 'Notre Mission',
                  content: 'Connecter les producteurs agricoles aux acheteurs de manière intelligente et équitable, en utilisant la technologie et l\'IA.',
                },
                {
                  title: 'Notre Vision',
                  content: 'Devenir la plus grande plateforme agricole d\'Afrique de l\'Ouest, transformant l\'accès aux marchés.',
                },
                {
                  title: 'Notre Valeur',
                  content: 'Transparence, qualité, intégrité. Chaque transaction compte et nous en garantissons la sécurité.',
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card>
                    <CardBody className="space-y-4">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{item.content}</p>
                    </CardBody>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-16">
              Nos Valeurs Fondamentales
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, idx) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Card hover>
                      <CardBody className="space-y-4 text-center">
                        <Icon className="w-12 h-12 text-primary-600 mx-auto" />
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{value.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
                      </CardBody>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-16">
              Notre Parcours
            </h2>
            <div className="max-w-3xl mx-auto">
              {milestones.map((milestone, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex gap-8 mb-8"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold">
                      {idx + 1}
                    </div>
                    {idx < milestones.length - 1 && (
                      <div className="w-1 h-20 bg-primary-600/30 mt-4" />
                    )}
                  </div>
                  <Card className="flex-1">
                    <CardBody>
                      <Badge variant="info">{milestone.year}</Badge>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-2">
                        {milestone.event}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">{milestone.desc}</p>
                    </CardBody>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-16">
              Notre Équipe d'Experts
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { name: 'Lamah Anathol', role: 'Fondateur & CEO', emoji: '👨‍💼' },
                { name: 'Marie Dubois', role: 'CTO & Tech Lead', emoji: '👩‍💻' },
                { name: 'Kouassi Yao', role: 'Head of Farming Relations', emoji: '👨‍🌾' },
                { name: 'Amara Diallo', role: 'Head of Operations', emoji: '👩‍💼' },
              ].map((member, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card hover className="text-center">
                    <CardBody className="space-y-4">
                      <div className="text-6xl">{member.emoji}</div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{member.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{member.role}</p>
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
