'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/Button';
import { Card, CardBody } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Leaf,
  TrendingUp,
  Users,
  MapPin,
  Award,
  Zap,
  Shield,
  Globe,
  ChevronRight,
  Star,
  ArrowRight,
} from 'react-icons/fa';

const features = [
  {
    icon: TrendingUp,
    title: 'Matching Intelligent',
    description: 'Moteur IA qui connecte les meilleures offres aux demandes en temps réel',
    color: 'from-green-400 to-green-600',
  },
  {
    icon: Users,
    title: 'Communauté Agricole',
    description: 'Connectez-vous avec 10,000+ producteurs et acheteurs vérifiés',
    color: 'from-blue-400 to-blue-600',
  },
  {
    icon: MapPin,
    title: 'Découverte Locale',
    description: 'Trouvez des offres agricoles à proximité avec carte interactive',
    color: 'from-orange-400 to-orange-600',
  },
  {
    icon: Award,
    title: 'Vérification Qualité',
    description: 'Tous les producteurs vérifiés avec certifications officielles',
    color: 'from-yellow-400 to-yellow-600',
  },
  {
    icon: Zap,
    title: 'Paiements Sécurisés',
    description: 'Intégration Orange Money, MTN Money, et Wave pour transactions',
    color: 'from-red-400 to-red-600',
  },
  {
    icon: Shield,
    title: 'Protection Totale',
    description: 'Escrow de paiement et protection acheteur garanties',
    color: 'from-purple-400 to-purple-600',
  },
];

const testimonials = [
  {
    name: 'Kouassi Yao',
    role: 'Producteur de Riz',
    location: 'Abidjan',
    image: '👨‍🌾',
    text: 'Agri-Match m\'a permis de multiplier mes ventes par 3 en 6 mois!',
    rating: 5,
  },
  {
    name: 'Aminata Traoré',
    role: 'Productrice de Maïs',
    location: 'Yamoussoukro',
    image: '👩‍🌾',
    text: 'La plateforme est simple et les paiements arrivent rapidement',
    rating: 5,
  },
  {
    name: 'Restaurant Central',
    role: 'Acheteur Professionnel',
    location: 'Abidjan',
    image: '🏪',
    text: 'Qualité garantie et prix compétitifs. Meilleure plateforme!',
    rating: 5,
  },
];

const stats = [
  { label: 'Producteurs Actifs', value: '2,547', icon: '👨‍🌾' },
  { label: 'Acheteurs Vérifiés', value: '1,832', icon: '🏪' },
  { label: 'Transactions', value: '15,432', icon: '💰' },
  { label: 'Tonnages Traités', value: '45,230', icon: '⚖️' },
];

const categories = [
  { name: 'Riz', icon: '🍚', count: '342 offres', color: 'from-yellow-100 to-yellow-200' },
  { name: 'Maïs', icon: '🌽', count: '256 offres', color: 'from-orange-100 to-orange-200' },
  { name: 'Légumes', icon: '🥬', count: '428 offres', color: 'from-green-100 to-green-200' },
  { name: 'Fruits', icon: '🍌', count: '387 offres', color: 'from-pink-100 to-pink-200' },
  { name: 'Viande', icon: '🥩', count: '156 offres', color: 'from-red-100 to-red-200' },
  { name: 'Lait & Produits', icon: '🥛', count: '234 offres', color: 'from-blue-100 to-blue-200' },
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Navbar />
      <main className="overflow-hidden">
        {/* Hero Section */}
        <section className="relative min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20 overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200 dark:bg-primary-900/20 rounded-full blur-3xl -z-10 animate-pulse" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-200 dark:bg-secondary-900/20 rounded-full blur-3xl -z-10 animate-pulse" />

          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="space-y-6">
                  <div className="inline-block">
                    <Badge size="lg" variant="success">
                      🌟 #1 Plateforme Agricole en Côte d'Ivoire
                    </Badge>
                  </div>

                  <h1 className="text-6xl md:text-7xl font-black text-gray-900 dark:text-white leading-tight">
                    Connectez les
                    <span className="block bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                      producteurs aux acheteurs
                    </span>
                  </h1>

                  <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                    La plateforme de mise en relation agricole la plus intelligente. Utilisez notre moteur IA pour
                    trouver les meilleures offres et clients en temps réel.
                  </p>

                  <div className="flex gap-4 flex-wrap pt-4">
                    <Link href="/marketplace">
                      <Button size="lg" className="gap-2">
                        Explorez les Offres <ArrowRight className="w-5 h-5" />
                      </Button>
                    </Link>
                    <Link href="/auth/register">
                      <Button variant="secondary" size="lg">
                        S'inscrire Gratuitement
                      </Button>
                    </Link>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-4 pt-8">
                    {stats.map((stat) => (
                      <div key={stat.label} className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4 backdrop-blur">
                        <div className="text-2xl mb-2">{stat.icon}</div>
                        <div className="text-2xl font-bold text-primary-600">{stat.value}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Right Visual */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="relative w-full aspect-square">
                  {/* Hero Illustration */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-400/20 to-secondary-400/20 rounded-3xl" />
                  <div className="absolute inset-4 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-8xl mb-4">🌾</div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Agri-Match CI
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        Intelligence Agricole
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">Pourquoi Agri-Match?</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Nous mettons les technologies les plus avancées au service de l'agriculture africaine
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <Card hover className="h-full group">
                      <CardBody className="space-y-4">
                        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform`}>
                          <Icon />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                      </CardBody>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">Catégories Populaires</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Explorez les produits les plus demandés en Côte d'Ivoire
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -10 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link href={`/marketplace?category=${category.name.toLowerCase()}`}>
                    <Card hover className={`bg-gradient-to-br ${category.color} cursor-pointer">
                      <CardBody className="text-center space-y-2">
                        <div className="text-5xl">{category.icon}</div>
                        <h3 className="font-bold text-gray-900">{category.name}</h3>
                        <p className="text-sm text-gray-700">{category.count}</p>
                      </CardBody>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-5xl font-bold text-center mb-16">Comment ça marche?</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: '1', title: 'Créez votre compte', desc: 'En 2 minutes, gratuit et sécurisé' },
                { step: '2', title: 'Publiez votre offre', desc: 'Décrivez vos produits ou besoins' },
                { step: '3', title: 'Obtenez des matchs', desc: 'Notre IA trouve les meilleurs partenaires' },
                { step: '4', title: 'Concluez la vente', desc: 'Paiement sécurisé et livraison garantie' },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-white/80">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">Témoignages</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">Ce que disent nos utilisateurs</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardBody className="space-y-4">
                      <div className="flex gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 italic">"{testimonial.text}"</p>
                      <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="text-3xl">{testimonial.image}</div>
                        <div>
                          <p className="font-bold text-gray-900 dark:text-white">{testimonial.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {testimonial.role} - {testimonial.location}
                          </p>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-5xl font-bold mb-6">Prêt à transformer votre activité?</h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Rejoignez les milliers de producteurs et acheteurs qui font confiance à Agri-Match
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link href="/auth/register">
                  <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                    Commencer Gratuitement
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="ghost" className="text-white border-white hover:bg-white/10">
                    Nous Contacter
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
