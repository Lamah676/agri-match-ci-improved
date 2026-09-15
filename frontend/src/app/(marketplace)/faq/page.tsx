'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CheckCircle, AlertCircle, HelpCircle } from 'react-icons/fa';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      category: 'Général',
      questions: [
        {
          q: 'Qu'est-ce qu'Agri-Match?',
          a: 'Agri-Match est une plateforme de mise en relation agricole qui connecte les producteurs aux acheteurs en utilisant l\'intelligence artificielle pour un matching intelligent.',
        },
        {
          q: 'Comment fonctionne le moteur de matching?',
          a: 'Notre IA analyse les offres et demandes en considérant le prix, la quantité, la catégorie et la localisation pour proposer les meilleures correspondances.',
        },
        {
          q: 'Est-ce gratuit de s\'inscrire?',
          a: 'Oui, l\'inscription est 100% gratuite. Vous ne payez que lors d\'une transaction réussie.',
        },
      ],
    },
    {
      category: 'Producteurs',
      questions: [
        {
          q: 'Comment publier une offre?',
          a: 'Allez dans votre tableau de bord, cliquez sur "Créer une offre", remplissez les détails (produit, quantité, prix, localisation) et publiez.',
        },
        {
          q: 'Quels documents dois-je fournir?',
          a: 'Pour vérification: pièce d\'identité, photo de profil, et pour certaines catégories, des certificats de qualité.',
        },
        {
          q: 'Comment augmenter mes ventes?',
          a: 'Utilisez des descriptions détaillées, mettez à jour régulièrement, maintenez des notes élevées et répondez vite aux acheteurs.',
        },
      ],
    },
    {
      category: 'Acheteurs',
      questions: [
        {
          q: 'Puis-je voir les offres avant de m\'inscrire?',
          a: 'Oui, vous pouvez naviguer et voir les offres, mais vous devez être inscrit et vérifié pour contacter les vendeurs.',
        },
        {
          q: 'Comment suis-je protégé lors d\'une transaction?',
          a: 'Nous utilisons un système de séquence de paiement: vous payez, le vendeur livre, puis le paiement est libéré.',
        },
        {
          q: 'Puis-je retourner un produit?',
          a: 'Oui, si le produit ne correspond pas à la description, vous avez 48h pour demander un remboursement ou un échange.',
        },
      ],
    },
    {
      category: 'Paiements',
      questions: [
        {
          q: 'Quels modes de paiement acceptez-vous?',
          a: 'Orange Money, MTN Money, Wave, et bientôt les virements bancaires.',
        },
        {
          q: 'Quels sont les frais?',
          a: '2% de frais de plateforme sur chaque transaction réussie. Les frais du mobile money sont à la charge de l\'acheteur.',
        },
        {
          q: 'Quand reçois-je mon argent?',
          a: 'Les fonds sont libérés 48h après la livraison confirmée, ou après le délai de retour de 7 jours.',
        },
      ],
    },
    {
      category: 'Sécurité',
      questions: [
        {
          q: 'Mes données sont-elles en sécurité?',
          a: 'Oui, nous utilisons le chiffrement SSL/TLS et respectons les normes de protection des données.',
        },
        {
          q: 'Comment éviter les escroqueries?',
          a: 'Vérifiez toujours les notes des utilisateurs, utilisez la plateforme pour communiquer, et ne payez jamais en dehors de la plateforme.',
        },
        {
          q: 'Que faire si je soupçonne une fraude?',
          a: 'Signalez immédiatement via le bouton "Signaler" sur le profil, et contactez notre équipe support.',
        },
      ],
    },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-3">
              <HelpCircle className="text-primary-600" />
              Questions Fréquemment Posées
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Trouvez réponse à vos questions sur Agri-Match
            </p>
          </motion.div>

          {/* FAQs */}
          <div className="max-w-4xl mx-auto space-y-8">
            {faqs.map((section, sectionIdx) => (
              <motion.div
                key={sectionIdx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <CheckCircle className="text-primary-600" />
                  {section.category}
                </h2>

                <div className="space-y-3">
                  {section.questions.map((item, idx) => {
                    const itemIndex = `${sectionIdx}-${idx}`;
                    const isOpen = openIndex === itemIndex;

                    return (
                      <motion.div key={idx} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <Card
                          className="cursor-pointer hover:shadow-lg transition-shadow"
                          onClick={() => setOpenIndex(isOpen ? null : itemIndex)}
                        >
                          <CardBody>
                            <div className="flex justify-between items-start">
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex-1">
                                {item.q}
                              </h3>
                              <span className={`transition-transform ${
                                isOpen ? 'rotate-180' : ''
                              }`}>
                                ▼
                              </span>
                            </div>
                            {isOpen && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
                              >
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                  {item.a}
                                </p>
                              </motion.div>
                            )}
                          </CardBody>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mt-16 text-center"
          >
            <Card className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
              <CardBody className="space-y-4">
                <h3 className="text-2xl font-bold">Vous n'avez pas trouvé votre réponse?</h3>
                <p className="text-lg text-white/90">Contactez notre équipe support</p>
                <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100 mx-auto">
                  Nous Contacter
                </Button>
              </CardBody>
            </Card>
          </motion.div>
        </div>
      </main>
    </>
  );
}
