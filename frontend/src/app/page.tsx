'use client';

import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/Button';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Leaf, TrendingUp, Users, MapPin } from 'react-icons/fa';

const features = [
  {
    icon: TrendingUp,
    title: 'Matching Intelligent',
    description: 'Moteur de matching IA qui connecte les offres aux demandes',
  },
  {
    icon: Users,
    title: 'Communauté Active',
    description: 'Connectez-vous avec producteurs et acheteurs',
  },
  {
    icon: MapPin,
    title: 'Découverte Locale',
    description: 'Trouvez des offres près de chez vous',
  },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800 py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="flex justify-center mb-6">
                <Leaf className="w-16 h-16 text-primary-600 animate-bounce" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Bienvenue sur <span className="text-primary-600">Agri-Match CI</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                La plateforme intelligente qui connecte les producteurs agricoles aux acheteurs de manière optimale
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link href="/offers">
                  <Button size="lg">Découvrir les offres</Button>
                </Link>
                <Link href="/auth/register">
                  <Button variant="secondary" size="lg">
                    S'inscrire gratuitement
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
              Pourquoi Agri-Match?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card hover className="text-center">
                      <CardBody>
                        <div className="flex justify-center mb-4">
                          <Icon className="w-12 h-12 text-primary-600" />
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {feature.description}
                        </p>
                      </CardBody>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Prêt à commencer?</h2>
            <p className="text-lg mb-8 text-primary-100">
              Rejoignez des milliers de producteurs et acheteurs en Côte d'Ivoire
            </p>
            <Link href="/auth/register">
              <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                Créer mon compte gratuitement
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
