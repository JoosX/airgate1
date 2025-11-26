import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Mail, Phone, MessageCircle } from "lucide-react";

const Help = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Centro de Ayuda</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* FAQ Section */}
            <div className="lg:col-span-2">
              <Card className="shadow-medium border-border/50">
                <CardHeader>
                  <CardTitle>Preguntas Frecuentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>¿Cómo puedo cambiar mi reserva?</AccordionTrigger>
                      <AccordionContent>
                        Para cambiar tu reserva, inicia sesión en tu cuenta y accede a "Mi Cuenta". 
                        Allí encontrarás todas tus reservas y podrás realizar cambios según el plan 
                        de vuelo que hayas seleccionado.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-2">
                      <AccordionTrigger>¿Qué incluye el equipaje pequeño?</AccordionTrigger>
                      <AccordionContent>
                        El equipaje pequeño incluye una maleta de mano de hasta 10kg con dimensiones 
                        máximas de 55x40x20cm y un artículo personal como una mochila o bolso pequeño.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-3">
                      <AccordionTrigger>¿Puedo cancelar mi vuelo?</AccordionTrigger>
                      <AccordionContent>
                        Las políticas de cancelación dependen del plan de vuelo seleccionado. 
                        El plan Flexible permite cancelaciones gratuitas hasta 24 horas antes del vuelo. 
                        El plan Premium incluye cancelación flexible y reembolso completo.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-4">
                      <AccordionTrigger>¿Cómo recibo mi boleto electrónico?</AccordionTrigger>
                      <AccordionContent>
                        Una vez confirmada tu compra, recibirás un correo electrónico con tu boleto 
                        electrónico y código de reserva. También puedes descargarlo desde tu cuenta 
                        en la sección "Mis Reservas".
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-5">
                      <AccordionTrigger>¿Qué documentos necesito para viajar?</AccordionTrigger>
                      <AccordionContent>
                        Necesitarás un documento de identidad válido (cédula o pasaporte) y tu boleto 
                        electrónico. Para vuelos internacionales, asegúrate de que tu pasaporte tenga 
                        vigencia de al menos 6 meses y verifica si necesitas visa para tu destino.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </div>

            {/* Contact Section */}
            <div className="space-y-6">
              <Card className="shadow-medium border-border/50">
                <CardHeader>
                  <CardTitle>Contacto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-sm text-muted-foreground">soporte@Airgate.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Teléfono</p>
                      <p className="text-sm text-muted-foreground">+34 900 123 456</p>
                      <p className="text-xs text-muted-foreground">Lun-Dom 24/7</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <MessageCircle className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Chat en vivo</p>
                      <p className="text-sm text-muted-foreground">Disponible 24/7</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Help;
