export interface PhishingEmail {
  id: string;
  from: string;
  fromName: string;
  subject: string;
  body: string;
  date: string;
  isPhishing: boolean;
  indicators: string[];
}

export const phishingEmails: PhishingEmail[] = [
  {
    id: 'pe-1',
    from: 'security-alert@paypa1-service.com',
    fromName: 'Equipo de Seguridad PayPal',
    subject: 'Urgente: Actividad sospechosa detectada en tu cuenta',
    body: `Estimado cliente,

Hemos detectado actividad inusual en tu cuenta. Tu cuenta ha sido limitada debido a intentos de inicio de sesión sospechosos.

Para restaurar el acceso, verifica tu identidad inmediatamente haciendo clic en el siguiente enlace:

https://paypa1-service.com/verify?id=8821xj

Si no verificas tu cuenta en 24 horas, será suspendida permanentemente.

Gracias,
Equipo de Seguridad PayPal`,
    date: '2024-03-15 09:42',
    isPhishing: true,
    indicators: [
      'Dominio falso "paypa1-service.com" (número "1" en lugar de letra "l")',
      'Sentido de urgencia: "en 24 horas" / "suspensión permanente"',
      'Saludo genérico "Estimado cliente" en lugar de tu nombre',
      'Enlace de verificación sospechoso',
    ],
  },
  {
    id: 'pe-2',
    from: 'no-reply@github.com',
    fromName: 'GitHub',
    subject: 'Nuevo inicio de sesión en tu cuenta desde un dispositivo nuevo',
    body: `Hola,

Un nuevo dispositivo ha iniciado sesión en tu cuenta desde una ubicación cerca de Londres, Reino Unido.

Si has sido tú, puedes ignorar este correo. Si no, te recomendamos revisar la actividad de tu cuenta y actualizar tu contraseña.

Para ver los detalles completos del inicio de sesión, visita:
https://github.com/settings/security

Gracias,
El equipo de GitHub`,
    date: '2024-03-14 14:10',
    isPhishing: false,
    indicators: [],
  },
  {
    id: 'pe-3',
    from: 'hr-payroll@company-net.internal',
    fromName: 'Departamento de Nómina',
    subject: 'Revisión Salarial 2024 - Actualiza tu Cuenta Bancaria',
    body: `Hola empleado,

Tu salario ha sido revisado y aprobado para un aumento del 7%. Para recibir tu pago actualizado, debes actualizar tu información de cuenta bancaria:

http://company-net.internal/payroll-update?token=9f2a

Completa esto en un plazo de 2 días hábiles.

Departamento de Nómina`,
    date: '2024-03-13 11:25',
    isPhishing: true,
    indicators: [
      'Dominio sospechoso ".internal" usado externamente',
      'Solicita actualizar cuenta bancaria (robo de credenciales financieras)',
      'Saludo genérico "Hola empleado"',
      'Presión de plazo corto "en 2 días hábiles"',
    ],
  },
  {
    id: 'pe-4',
    from: 'support@netflix.com',
    fromName: 'Netflix',
    subject: 'Tu factura mensual está disponible',
    body: `Hola,

Tu factura de membresía de Netflix para marzo de 2024 ya está disponible.

Plan: Premium - $19.99/mes
Método de pago: Visa terminada en 4242
Próxima fecha de cobro: 12 de abril de 2024

Para ver o descargar tu factura, inicia sesión en tu cuenta en:
https://www.netflix.com/YourAccount

Este es un mensaje automático, por favor no respondas.`,
    date: '2024-03-12 00:01',
    isPhishing: false,
    indicators: [],
  },
  {
    id: 'pe-5',
    from: 'winner@lottery-intl-promo.biz',
    fromName: 'Promoción Internacional de Lotería',
    subject: '¡FELICIDADES! Has ganado $850,000 USD',
    body: `Estimado ganador,

Nos complace informarte que tu dirección de correo ha sido seleccionada como una de las ganadoras de nuestra Promoción Internacional de Lotería por un valor de $850,000 USD.

Para reclamar tu premio, envía tus datos personales y una tarifa de procesamiento de $250 mediante transferencia bancaria a la cuenta siguiente:

Banco: First National, Cuenta: 00928374, Ruta: 021000021

Agente de reclamos: Sr. David Moore
Correo: claims@lottery-intl-promo.biz`,
    date: '2024-03-11 18:33',
    isPhishing: true,
    indicators: [
      'Premio demasiado bueno para ser cierto / fraude de pago anticipado',
      'Solicita "tarifa de procesamiento" por transferencia bancaria',
      'Dominio de mala reputación ".biz" con "lottery-promo"',
      'Solicita datos personales a un desconocido',
    ],
  },
  {
    id: 'pe-6',
    from: 'noreply@accounts.google.com',
    fromName: 'Google',
    subject: 'Revisión de seguridad: mejora la protección de tu cuenta',
    body: `Hola,

Una revisión de seguridad reciente encontró formas de mejorar la protección de tu cuenta.

Acciones recomendadas:
- Añade un número de teléfono de recuperación
- Revisa los dispositivos recientes con acceso a la cuenta
- Activa la verificación en dos pasos

Puedes completar tu revisión de seguridad en:
https://myaccount.google.com/security-checkup

Este correo se envió porque tienes una cuenta de Google.

Atentamente,
El equipo de Cuentas de Google`,
    date: '2024-03-10 07:15',
    isPhishing: false,
    indicators: [],
  },
  {
    id: 'pe-7',
    from: 'support@amaz0n-secure.com',
    fromName: 'Amazon Security',
    subject: 'Su cuenta ha sido bloqueada por actividad inusual',
    body: `Estimado cliente,

Hemos detectado un acceso no autorizado a su cuenta de Amazon. Por su seguridad, hemos suspendido temporalmente su cuenta.

Para reactivar su cuenta, confirme su identidad en el siguiente enlace:

http://amaz0n-secure.com/verify?account=7782

Si no realiza esta verificación en 12 horas, su cuenta sera eliminada permanentemente.

Atentamente,
Equipo de Seguridad Amazon`,
    date: '2024-03-09 16:20',
    isPhishing: true,
    indicators: [
      'Dominio falso "amaz0n-secure.com" (cero en lugar de letra "o")',
      'Urgencia extrema: "12 horas" / "eliminada permanentemente"',
      'Saludo genérico "Estimado cliente"',
      'Enlace de verificación sospechoso fuera del dominio oficial amazon.com',
    ],
  },
  {
    id: 'pe-8',
    from: 'microsoft@security-team-msft.online',
    fromName: 'Microsoft 365',
    subject: 'Su suscripcion de Office ha expirado - Renueve ahora',
    body: `Hola,

Su suscripcion a Microsoft 365 Office ha expirado. Para evitar la perdida de sus documentos y correos, renueve ahora mismo:

Pague $49.99 en el siguiente enlace para restaurar su cuenta:
http://microsoft-renew-team.online/pay?ref=office365

La oferta es valida solo por hoy.

Equipo de Facturacion Microsoft`,
    date: '2024-03-08 10:05',
    isPhishing: true,
    indicators: [
      'Dominio falso ".online" suplantando a Microsoft',
      'Presión temporal: "valida solo por hoy"',
      'Solicitud de pago urgente para evitar pérdida de datos',
      'Saludo genérico y errores ortográficos intencionales',
    ],
  },
  {
    id: 'pe-9',
    from: 'notifications@slack.com',
    fromName: 'Slack',
    subject: 'Tienes 3 mensajes sin leer en #seguridad-it',
    body: `Hola,

Tienes 3 mensajes sin leer en el canal #seguridad-it de tu espacio de trabajo.

Para ver los mensajes, abre Slack o visita:
https://app.slack.com/client/T0J9KQ0LM/seguridad-it

Si no deseas recibir estas notificaciones, puedes cambiar tus preferencias en:
https://slack.com/intl/es-es/help/articles/201355157

El equipo de Slack`,
    date: '2024-03-07 08:30',
    isPhishing: false,
    indicators: [],
  },
  {
    id: 'pe-10',
    from: 'delivery@dhl-express-tracking.info',
    fromName: 'DHL Express',
    subject: 'Paquete no entregado - Confirmar direccion de envio',
    body: `Estimado cliente,

Intentamos entregar su paquete pero no estaba disponible. Su paquete sera devuelto en 48 horas si no confirma su direccion.

Para reprogramar la entrega, pague una tarifa de reenvio de $2.50:

http://dhl-express-tracking.info/reschedule?id=44129

DHL Express Servicios`,
    date: '2024-03-06 14:45',
    isPhishing: true,
    indicators: [
      'Dominio falso "dhl-express-tracking.info" (no es el dominio oficial dhl.com)',
      'Solicitud de pago para "reenvio" - las empresas de mensajería reales no cobran por reprogramar',
      'Urgencia: "48 horas" para confirmar',
      'Saludo genérico sin número de seguimiento real',
    ],
  },
  {
    id: 'pe-11',
    from: 'boss@company.com',
    fromName: 'Director General',
    subject: 'Urgente: Transferencia bancaria inmediata',
    body: `Hola,

Necesito que realices una transferencia urgente a un proveedor nuevo. Es confidencial.

Datos bancarios:
Banco: Santander
IBAN: ES91 2100 0418 4502 0005 1332
Beneficiario: Global Solutions SL
Monto: $12,500

No puedo hablar por telefono ahora, estoy en una reunion. Por favor confirma cuando este hecho.

Saludos,
Director General`,
    date: '2024-03-05 11:00',
    isPhishing: true,
    indicators: [
      'Ataque BEC (Business Email Compromise): suplanta al director de la empresa',
      'Urgencia extrema y confidencialidad',
      'No se puede verificar por telefono (excusa clasica)',
      'Solicitud de transferencia bancaria grande a cuenta desconocida',
    ],
  },
  {
    id: 'pe-12',
    from: 'newsletter@linkedin.com',
    fromName: 'LinkedIn',
    subject: 'Tu resumen semanal: 5 nuevas conexiones y 2 visitas a tu perfil',
    body: `Hola,

Aqui esta tu resumen semanal de LinkedIn:

- 5 nuevas conexiones: Carlos M., Laura G., Javier P., Ana R., Diego F.
- 2 personas visitaron tu perfil
- 1 nueva publicacion en tu red: "Tendencias en ciberseguridad 2024"

Para ver mas detalles, visita:
https://www.linkedin.com/notifications

Saludos,
El equipo de LinkedIn`,
    date: '2024-03-04 06:00',
    isPhishing: false,
    indicators: [],
  },
  {
    id: 'pe-13',
    from: 'no-reply@dropbox-share.cloud',
    fromName: 'Dropbox',
    subject: 'Carlos Hernandez ha compartido un documento contigo',
    body: `Hola,

Carlos Hernandez ha compartido un archivo contigo:
"Confidencial-Planta-Nueva.pdf"

Para ver el documento, haz clic aqui:
https://dropbox-share.cloud/file?id=9921&auth=view

Saludos,
El equipo de Dropbox`,
    date: '2024-03-20 15:22',
    isPhishing: true,
    indicators: [
      'Dominio falso "dropbox-share.cloud" (no es el dominio oficial dropbox.com)',
      'Asunto genera curiosidad: documento "Confidencial" para incitar a abrir',
      'Enlace de descarga directa sin pasar por la autenticacion de Dropbox',
      'Saludo generico sin el nombre real del destinatario',
    ],
  },
  {
    id: 'pe-14',
    from: 'it-helpdesk@company.com',
    fromName: 'Soporte IT Corporativo',
    subject: 'Actualizacion de buzon requerida - Su cuenta sera suspendida',
    body: `Estimado usuario,

Nuestro sistema detecta que su buzon de correo ha excedido el limite de almacenamiento (9.8 GB de 10 GB).

Para evitar la suspension de su cuenta, debe confirmar su direccion de correo y contrasena en el siguiente enlace:

http://mail-verify.company-portal.net/update?acct=verify

Tiene hasta las 23:59 de hoy para completar la verificacion.

Soporte IT Corporativo`,
    date: '2024-03-18 10:45',
    isPhishing: true,
    indicators: [
      'Amenaza de suspension inmediata: "hasta las 23:59 de hoy"',
      'Solicita confirmar contrasena por enlace (IT legitimo nunca pide contrasenas)',
      'Dominio falso "company-portal.net" no coincide con el dominio corporativo real',
      'Falsa urgencia tecnica: "buzon excedido" para provocar panico',
    ],
  },
  {
    id: 'pe-15',
    from: 'noreply@stripe.com',
    fromName: 'Stripe',
    subject: 'Pago recibido - $1,299.00 USD de Acme Corp',
    body: `Hola,

Has recibido un pago de $1,299.00 USD de Acme Corp.

ID de pago: pi_3O8xK2J9fLmN4qXy
Fecha: 22 de marzo de 2024
Estado: Completado

Los fondos apareceran en tu cuenta bancaria en 2 dias habiles.

Para ver los detalles completos, inicia sesion en tu panel:
https://dashboard.stripe.com/payments/pi_3O8xK2J9fLmN4qXy

Saludos,
El equipo de Stripe`,
    date: '2024-03-22 14:00',
    isPhishing: false,
    indicators: [],
  },
  {
    id: 'pe-16',
    from: 'ceo@company-urgent.com',
    fromName: 'Ana Garcia - CEO',
    subject: 'Re: Proyecto confidencial - Necesito tu ayuda ahora',
    body: `Hola,

Estoy en una reunion de junta urgente y necesito que compres 5 tarjetas de regalo de Amazon de $500 cada una para los premios del empleado del ano.

Enviame los codigos de las tarjetas lo antes posible por correo. Es confidencial, no comentes esto con nadie.

Gracias,
Ana Garcia
CEO`,
    date: '2024-03-21 16:30',
    isPhishing: true,
    indicators: [
      'Ataque de regalo de tarjetas (gift card scam): solicitud inusual de tarjetas de regalo',
      'Dominio falso "company-urgent.com" (no es el dominio corporativo real)',
      'Urgencia extrema: "necesito tu ayuda ahora"',
      'Pide secreto: "no comentes esto con nadie" para evitar verificacion',
    ],
  },
  {
    id: 'pe-17',
    from: 'security@mailgun-protect.net',
    fromName: 'Equipo de Seguridad - Microsoft',
    subject: 'Verificacion de cuenta de Microsoft 365 requerida',
    body: `Estimado usuario,

Detectamos un intento de acceso no autorizado a su cuenta de Microsoft 365 desde una ubicacion desconocida (Moscu, Rusia).

Si NO fue usted, su cuenta podria estar comprometida. Para proteger su informacion, verifique su identidad ahora:

https://ms365-protect.net/verify?user=security-check&token=abc123

Si ignora este mensaje, su acceso a Office, Teams y Outlook sera bloqueado en 2 horas.

Equipo de Seguridad Microsoft 365`,
    date: '2024-03-19 08:15',
    isPhishing: true,
    indicators: [
      'Dominio falso "mailgun-protect.net" no pertenece a Microsoft',
      'Enlace de verificacion a dominio no oficial de Microsoft',
      'Falsa alerta de intrusion para crear panico: acceso desde "Moscu, Rusia"',
      'Amenaza de bloqueo en "2 horas" para forzar accion inmediata',
    ],
  },
  {
    id: 'pe-18',
    from: 'noreply@zoom.us',
    fromName: 'Zoom',
    subject: 'Tu reunion grabada esta lista para ver',
    body: `Hola,

La grabacion de tu reunion "Reunion de equipo semanal" del 20 de marzo de 2024 ya esta disponible.

Duracion: 45 minutos
Tamano: 128 MB

Para ver o descargar la grabacion, visita:
https://zoom.us/rec/share/T0J9KQ0LMabc123def456

Este enlace expirara en 30 dias.

Equipo de Zoom`,
    date: '2024-03-20 18:00',
    isPhishing: false,
    indicators: [],
  },
  {
    id: 'pe-19',
    from: 'recruiter@job-offer-top.com',
    fromName: 'Recursos Humanos - TechCorp',
    subject: 'Oferta de empleo: Desarrollador Senior - $120,000/anual',
    body: `Estimado candidato,

Tras revisar su perfil en LinkedIn, nos gustaria ofrecerle una posicion como Desarrollador Senior en TechCorp.

Salario: $120,000 USD anuales
Modalidad: Remoto
Beneficios: Seguro medico, 30 dias de vacaciones

Para aceptar la oferta, complete el formulario de registro con sus datos personales y bancarios:

http://job-offer-top.com/accept-offer?ref=techcorp2024

La oferta es valida por 48 horas.

Departamento de RRHH - TechCorp`,
    date: '2024-03-23 09:00',
    isPhishing: true,
    indicators: [
      'Oferta de empleo no solicitada ("falsa oferta"): demasiado buena para ser cierta',
      'Dominio falso "job-offer-top.com" no pertenece a TechCorp',
      'Solicita datos personales y bancarios en un formulario externo',
      'Urgencia artificial: "valida por 48 horas"',
    ],
  },
  {
    id: 'pe-20',
    from: 'support@apple-id-locked.com',
    fromName: 'Apple',
    subject: 'Su Apple ID ha sido bloqueado por seguridad',
    body: `Estimado cliente,

Su Apple ID ha sido bloqueado por motivos de seguridad tras detectar multiples intentos de inicio de sesion fallidos.

Para desbloquear su cuenta y restaurar el acceso a iCloud, App Store y todos los servicios de Apple, verifique su identidad en:

https://apple-id-locked.com/verify?account=restore

Si no verifica su cuenta en 24 horas, sera eliminada permanentemente junto con todos sus datos de iCloud.

Soporte Apple`,
    date: '2024-03-24 12:30',
    isPhishing: true,
    indicators: [
      'Dominio falso "apple-id-locked.com" (Apple usa apple.com)',
      'Amenaza de eliminacion de datos: "junto con todos sus datos de iCloud"',
      'Urgencia extrema: "24 horas" para actuar',
      'Saludo generico "Estimado cliente" sin nombre real',
    ],
  },
  {
    id: 'pe-21',
    from: 'noreply@spain-treasury.gov.es',
    fromName: 'Agencia Tributaria',
    subject: 'Devolucion de impuestos disponible - 480 EUR',
    body: `Estimado contribuyente,

Tras la revision de su declaracion de la renta 2023, se ha determinado que tiene derecho a una devolucion de 480 EUR.

Para recibir la devolucion, debe confirmar sus datos bancarios en el siguiente formulario oficial:

https://spain-treasury.gov.es/devolucion?ref=irpf2023&id=7721

Tiene 5 dias habiles para reclamar su devolucion antes de que expire.

Agencia Tributaria Espanola`,
    date: '2024-03-25 08:00',
    isPhishing: true,
    indicators: [
      'Suplantacion de la Agencia Tributaria (phishing fiscal)',
      'Dominio falso "spain-treasury.gov.es" (el oficial es agenciatributaria.gob.es)',
      'Solicita datos bancarios para procesar una "devolucion" inexistente',
      'Cebo economico: "480 EUR de devolucion" para incitar a actuar',
    ],
  },
  {
    id: 'pe-22',
    from: 'alerts@chase-bank-secure.net',
    fromName: 'Chase Bank',
    subject: 'Alerta de fraude: Transaccion sospechosa de $3,400.00',
    body: `Estimado cliente,

Hemos detectado una transaccion sospechosa en su tarjeta de debito:

Monto: $3,400.00
Comercio: ELECTRONICS ONLINE STORE
Fecha: 24/03/2024 03:42 AM

Si NO reconoce esta transaccion, debe confirmar o cancelar inmediatamente:

https://chase-bank-secure.net/fraud-alert?action=cancel&card=8821

Si no responde en 1 hora, la transaccion sera aprobada.

Departamento de Fraude - Chase Bank`,
    date: '2024-03-24 04:15',
    isPhishing: true,
    indicators: [
      'Dominio falso "chase-bank-secure.net" (Chase usa chase.com)',
      'Falsa alerta de fraude nocturna para crear panico inmediato',
      'Enlace de "cancelacion" que captura credenciales bancarias',
      'Amenaza de aprobacion automatica: "en 1 hora" si no actua',
    ],
  },
  {
    id: 'pe-23',
    from: 'feedback@google-forms-secure.io',
    fromName: 'RRHH - Encuesta Interna',
    subject: 'Encuesta de satisfaccion laboral obligatoria',
    body: `Hola,

El departamento de Recursos Humanos ha creado una encuesta de satisfaccion laboral obligatoria para todos los empleados.

La encuesta toma menos de 5 minutos y debe completarse antes del viernes.

Acceda a la encuesta con sus credenciales corporativas:
https://google-forms-secure.io/survey?company=internal&dept=hr

Gracias por su participacion.

RRHH`,
    date: '2024-03-26 09:30',
    isPhishing: true,
    indicators: [
      'Dominio falso "google-forms-secure.io" suplantando Google Forms',
      'Solicita credenciales corporativas para una "encuesta" (robo de credenciales)',
      'Falsa urgencia: "obligatoria" y "antes del viernes"',
      'Parece un correo interno legitimo pero usa un dominio externo sospechoso',
    ],
  },
  {
    id: 'pe-24',
    from: 'shipping@fedex.com',
    fromName: 'FedEx',
    subject: 'Tu envio #7741290653 esta en transito',
    body: `Hola,

Tu envio #7741290653 esta actualmente en transito.

Estado: En centro de distribucion
Ubicacion: Madrid, Espana
Fecha estimada de entrega: 27 de marzo de 2024

Para rastrear tu paquete en tiempo real:
https://www.fedex.com/fedextrack/?trknbr=7741290653

Si tienes preguntas sobre tu envio, no respondas a este correo. Contacta con el remitente.

Gracias por elegir FedEx.`,
    date: '2024-03-25 14:20',
    isPhishing: false,
    indicators: [],
  },
];

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: '¿Cuál es la práctica más segura para crear contraseñas?',
    options: [
      'Usar una contraseña basada en datos personales conocidos (mascota, fecha de nacimiento) combinados con símbolos, ya que la complejidad de los caracteres especiales compensa la brevedad',
      'Reutilizar la misma contraseña de alta entropía en todas las cuentas, dado que si es lo suficientemente larga no necesita ser única por servicio',
      'Usar una frase de contraseña única de 12+ caracteres por cuenta, guardada en un gestor de contraseñas',
      'Escribir contraseñas en una nota física guardada en un cajón con llave, ya que el aislamiento físico es más seguro que el almacenamiento digital',
    ],
    correctIndex: 2,
    explanation: 'Las frases de contraseña únicas y largas, guardadas en un gestor de contraseñas reputado, eliminan el riesgo de reutilización y resisten ataques de fuerza bruta.',
    category: 'Contraseñas',
  },
  {
    id: 2,
    question: '¿Cuál de los siguientes es el indicador más fuerte de un correo de phishing?',
    options: [
      'El correo está bien formateado, usa el logotipo corporativo oficial y pasa las validaciones SPF, DKIM y DMARC, lo que garantiza que proviene del dominio legítimo de la empresa',
      'Un sentido de urgencia combinado con una solicitud para hacer clic en un enlace o proporcionar credenciales',
      'El correo llega fuera del horario laboral habitual (fin de semana o madrugada), ya que los atacantes operan desde distintas zonas horarias para evadir detección',
      'El correo contiene un archivo adjunto cifrado con contraseña que debe descifrarse con credenciales corporativas, lo que indica un intento de exfiltración de datos',
    ],
    correctIndex: 1,
    explanation: 'La urgencia combinada con la recolección de credenciales es el patrón psicológico central del phishing, independientemente de la calidad del formato.',
    category: 'Phishing',
  },
  {
    id: 3,
    question: '¿Qué garantiza HTTPS al navegar por un sitio web?',
    options: [
      'Que el sitio web es 100% legítimo y de confianza, ya que la autoridad certificadora verifica exhaustivamente la identidad legal y reputación del propietario antes de emitir el certificado',
      'Que tu conexión al servidor está cifrada en tránsito',
      'Que el sitio no puede ser hackeado, porque el cifrado TLS de extremo a extremo imposibilita la inyección de payloads maliciosos en el código del servidor',
      'Que tus datos personales están guardados de forma segura en el servidor, ya que HTTPS cifra los datos en reposo aplicando AES-256 al almacenamiento subyacente de la base de datos',
    ],
    correctIndex: 1,
    explanation: 'HTTPS cifra el tráfico entre cliente y servidor. NO valida las intenciones del sitio — los sitios de phishing también usan HTTPS.',
    category: 'Seguridad Web',
  },
  {
    id: 4,
    question: '¿Por qué es importante la autenticación multifactor (MFA)?',
    options: [
      'Añade un retardo artificial (rate limiting) al proceso de inicio de sesión para que los ataques de fuerza bruta sean computacionalmente inviables por el tiempo que consume cada intento',
      'Añade una segunda prueba de identidad, por lo que una contraseña robada por sí sola no basta para vulnerar la cuenta',
      'Reemplaza la necesidad de una contraseña fuerte, ya que el segundo factor (OTP o llave hardware) proporciona entropía suficiente para compensar contraseñas débiles o reutilizadas',
      'Previene todos los vectores de ataque comunes (phishing, MITM, fuerza bruta y credential stuffing) mediante verificación criptográfica mutua basada en certificados de cliente',
    ],
    correctIndex: 1,
    explanation: 'MFA añade un factor de autenticación independiente. Aunque la contraseña se filtre, el atacante sigue necesitando el segundo factor.',
    category: 'Autenticación',
  },
  {
    id: 5,
    question: 'Recibes una memoria USB que no esperabas. ¿Cuál es la acción más segura?',
    options: [
      'Conectarla en modo lectura a un equipo aislado sin antivirus para inspeccionar los archivos y, mediante metadatos EXIF o documentos internos, identificar al propietario legítimo para devolverla',
      'Conectarla pero solo abrir archivos de datos (PDF, imágenes) evitando ejecutables, ya que los antivirus modernos detectan y bloquean el auto-run de firmware malicioso en memorias USB',
      'No conectarla; entregarla a TI/seguridad para su análisis',
      'Formatearla inmediatamente a nivel de sistema de archivos (FAT32 o exFAT) para sobrescribir cualquier payload oculto y reutilizarla como medio de almacenamiento seguro',
    ],
    correctIndex: 2,
    explanation: 'Las memorias USB desconocidas pueden ejecutar malware mediante auto-run o firmware malicioso. Nunca conectes dispositivos no confiables a equipos de producción.',
    category: 'Seguridad Física',
  },
  {
    id: 6,
    question: '¿Qué es el "smishing"?',
    options: [
      'Un ataque de phishing dirigido a través de mensajes SMS',
      'Un tipo de malware troyano que infecta teléfonos móviles mediante APKs falsos distribuidos en tiendas no oficiales, robando credenciales bancarias vía accesibilidad de Android',
      'Un método de cifrado de extremo a extremo para mensajes de texto basado en el protocolo Signal, usado para proteger SMS contra interceptación por parte de operadores y terceros',
      'Un ataque que falsifica el número de teléfono del remitente mediante spoofing de SS7, permitiendo suplantar la identidad del remitente en redes GSM para eludir filtros anti-spam de operadores',
    ],
    correctIndex: 0,
    explanation: 'El smishing es phishing por SMS. Los atacantes envían mensajes con enlaces maliciosos o números de teléfono para robar información personal.',
    category: 'Phishing',
  },
  {
    id: 7,
    question: '¿Qué es un ataque "Man-in-the-Middle" (MITM)?',
    options: [
      'Un ataque donde el atacante intercepta y posiblemente modifica la comunicación entre dos partes',
      'Un ataque que explota vulnerabilidades de asignación de memoria en el heap del sistema operativo para inyectar shellcode entre dos procesos en comunicación local',
      'Un tipo de phishing por correo electrónico que utiliza cabeceras SMTP manipuladas para insertar contenido malicioso entre el servidor de correo del remitente y el del destinatario',
      'Un método de replicación de datos entre servidores primarios y secundarios donde el intermediario mantiene una copia sincronizada para tolerancia a fallos',
    ],
    correctIndex: 0,
    explanation: 'En un MITM, el atacante se interpone entre dos partes sin que lo sepan, interceptando, leyendo o modificando el tráfico. HTTPS y VPN mitigan este ataque.',
    category: 'Ataques',
  },
  {
    id: 8,
    question: '¿Qué es el "credential stuffing" (relleno de credenciales)?',
    options: [
      'Un método de automatización de formularios web que rellena campos de credenciales almacenados en un gestor para acelerar el inicio de sesión legítimo del usuario en múltiples servicios',
      'Un ataque que prueba pares de usuario/contraseña robados en múltiples sitios web',
      'Un ataque de fuerza bruta que genera todas las combinaciones posibles de caracteres para una longitud dada, probándolas sistemáticamente contra un único objetivo hasta encontrar la contraseña correcta',
      'Un método de almacenamiento de credenciales que usa funciones de derivación de claves (PBKDF2) con salt único para proteger contraseñas en reposo contra ataques de tabla arcoíris',
    ],
    correctIndex: 1,
    explanation: 'El credential stuffing usa credenciales filtradas en un sitio y las prueba automáticamente en muchos otros, aprovechando que los usuarios reutilizan contraseñas.',
    category: 'Ataques',
  },
  {
    id: 9,
    question: '¿Qué es la seguridad "Zero Trust" (Confianza Cero)?',
    options: [
      'Un modelo que no confía en nada ni nadie, verificando cada solicitud de acceso sin importar su origen',
      'Un sistema de denegación por defecto que bloquea todas las conexiones entrantes y salientes excepto las explicitamente allowlisted en el firewall perimetral',
      'Un motor antivirus basado en heurística conductual que opera sin necesidad de firmas actualizadas, detectando amenazas zero-day mediante análisis de comportamiento en sandbox',
      'Un marco de gestión de identidades que elimina todas las contraseñas estáticas reemplazándolas exclusivamente con certificados X.509 y autenticación mutua basada en TLS',
    ],
    correctIndex: 0,
    explanation: 'Zero Trust asume que la red ya está comprometida. Verifica cada acceso de forma continua, sin confiar automáticamente en usuarios o dispositivos dentro de la red corporativa.',
    category: 'Defensa',
  },
  {
    id: 10,
    question: '¿Qué es el "phishing de lanza" (spear phishing)?',
    options: [
      'Un ataque de phishing dirigido a un individuo u organización específica con información personalizada',
      'Un ataque de ingeniería social que consiste en enviar correos phishing masivos en horarios laborales para maximizar la tasa de apertura según estudios de comportamiento organizacional',
      'Un método automatizado de credential harvesting que usa bots para completar formularios de login con credenciales filtradas en sitios de alto valor financiero',
      'Una técnica de OSINT que recopila metadatos de documentos públicos filtrados para construir perfiles de víctimas sin interacción directa con ellas',
    ],
    correctIndex: 0,
    explanation: 'El spear phishing personaliza el ataque usando información real de la víctima (nombre, puesto, proyectos) obtenida de redes sociales, aumentando enormemente su eficacia.',
    category: 'Phishing',
  },
  {
    id: 11,
    question: '¿Qué es un "honeypot" (tarro de miel)?',
    options: [
      'Un software de detección de malware que actúa como cebo emulando vulnerabilidades conocidas para generar firmas de antivirus actualizadas automáticamente',
      'Un sistema señuelo diseñado para atraer atacantes y estudiar sus técnicas',
      'Un firewall de próxima generación para uso doméstico que combina inspección profunda de paquetes (DPI) con filtrado de contenido y detección de intrusos basada en firmas',
      'Un método de recuperación de contraseñas que utiliza tablas precomputadas de hashes para acelerar el descifrado de credenciales NTLM almacenadas en controladores de dominio',
    ],
    correctIndex: 1,
    explanation: 'Un honeypot simula un sistema vulnerable para atraer atacantes. Su propósito es detectar intrusiones, recopilar inteligencia sobre amenazas y desviar ataques de sistemas reales.',
    category: 'Defensa',
  },
  {
    id: 12,
    question: '¿Qué es el "tailgating" o "piggybacking" en seguridad física?',
    options: [
      'Un ataque de seguimiento de vehículos (stalking) que utiliza GPS y reconocimiento de matrículas para rastrear empleados desde sus domicilios hasta instalaciones corporativas',
      'Cuando una persona no autorizada sigue de cerca a alguien autorizado para acceder a un área restringida',
      'Un tipo de malware de propagación autónoma que se transmite entre dispositivos mediante el protocolo USB Mass Storage sin requerir interacción del usuario',
      'Un método de cifrado de archivos en tránsito que usa cifrado asimétrico RSA-4096 para proteger datos almacenados en dispositivos portátiles contra accesos no autorizados',
    ],
    correctIndex: 1,
    explanation: 'El tailgating aprovecha la cortesía humana: alguien sostiene la puerta abierta a un extraño que entra detrás de ellos, saltándose controles de acceso físico.',
    category: 'Seguridad Física',
  },
  {
    id: 13,
    question: '¿Qué es el "SQL Injection" (inyección SQL)?',
    options: [
      'Un ataque que inyecta payloads de malware compilado directamente en el almacenamiento de bases de datos relacionales mediante procedimientos almacenados maliciosos',
      'Un ataque que inserta código SQL malicioso en campos de entrada para manipular la base de datos',
      'Una técnica de optimización de consultas que reescribe SQL dinámico para reducir el coste del optimizador basado en costos del DBMS mediante hints de índices',
      'Un firewall de base de datos de nueva generación que inspecciona tráfico SQL en tiempo real bloqueando inyecciones conocidas mediante firmas y análisis heurístico',
    ],
    correctIndex: 1,
    explanation: 'SQL Injection explota campos de entrada no sanitizados para ejecutar comandos SQL arbitrarios, permitiendo leer, modificar o eliminar datos de la base de datos.',
    category: 'Seguridad Web',
  },
  {
    id: 14,
    question: '¿Qué es el "vishing" (voice phishing)?',
    options: [
      'Un ataque de phishing realizado mediante llamadas telefónicas',
      'Un ataque que utiliza deepfakes de vídeo generados con GANs para suplantar la identidad visual de ejecutivos en videollamadas y autorizar transferencias fraudulentas',
      'Un tipo de malware troyano que captura audio del micrófono del dispositivo comprometido y lo exfiltra vía canal C2 encubierto usando protocolo DNS tunneling',
      'Un método de cifrado de llamadas VoIP basado en SRTP (Secure Real-time Transport Protocol) que protege la confidencialidad e integridad de comunicaciones de voz contra interceptación',
    ],
    correctIndex: 0,
    explanation: 'El vishing utiliza llamadas telefónicas para engañar a las víctimas y obtener información confidencial, a menudo suplantando entidades bancarias o de soporte técnico.',
    category: 'Phishing',
  },
  {
    id: 15,
    question: '¿Qué es el "principio de defensa en profundidad"?',
    options: [
      'Implementar una única capa de seguridad perimetral de máxima robustez (firewall de próxima generación con IPS y sandboxing) que centralice toda la inspección de tráfico en un solo punto de control',
      'Aplicar múltiples capas de seguridad independientes para que si una falla, las demás sigan protegiendo',
      'Una técnica de protección física de centros de datos que consiste en cavar fosos perimetrales y instalar barreras físicas anti-ramming alrededor de los racks de servidores',
      'Una estrategia de gestión de contraseñas que exige frases de contraseña de más de 64 caracteres con entropía mínima de 256 bits, usando derivación Argon2id con factor de memoria elevado',
    ],
    correctIndex: 1,
    explanation: 'La defensa en profundidad combina firewalls, antivirus, MFA, cifrado, segmentación de red y políticas, de modo que ningún fallo único comprometa todo el sistema.',
    category: 'Defensa',
  },
  {
    id: 16,
    question: '¿Qué es un SIEM y cuál es su función principal?',
    options: [
      'Un motor antivirus de nueva generación basado en machine learning que detecta malware zero-day analizando comportamiento de procesos en un sandbox virtualizado antes de la ejecución',
      'Una plataforma que centraliza y correlaciona logs de seguridad para detectar amenazas en tiempo real',
      'Un firewall de próxima generación (NGFW) que combina filtrado de paquetes stateful, inspección profunda de paquetes (DPI) y prevención de intrusos (IPS) en un solo appliance de red',
      'Un sistema de gestión de identidades y accesos (IAM) que centraliza el aprovisionamiento de cuentas, federación de identidades y gobierno del ciclo de vida de usuarios',
    ],
    correctIndex: 1,
    explanation: 'Un SIEM (Splunk, QRadar, Elastic) recolecta logs de todos los sistemas, los correlaciona y genera alertas, permitiendo detectar ataques que individualmente parecerían inofensivos.',
    category: 'Blue Team',
  },
  {
    id: 17,
    question: '¿Qué es la primera fase del ciclo de un ataque Red Team?',
    options: [
      'Explotación directa de vulnerabilidades conocidas usando frameworks como Metasploit para obtener acceso inicial al entorno objetivo',
      'Reconocimiento y recolección de información sobre el objetivo',
      'Escalada de privilegios horizontal mediante kerberoasting y AS-REP roasting contra el Active Directory del dominio objetivo',
      'Instalación de persistencia mediante claves de registro Run, tareas programadas y servicios maliciosos para mantener acceso tras un reinicio',
    ],
    correctIndex: 1,
    explanation: 'El Red Team siempre empieza con reconocimiento: identificar activos, servicios, empleados y superficie de ataque antes de intentar cualquier explotación.',
    category: 'Red Team',
  },
  {
    id: 18,
    question: '¿Qué es un "reverse shell" en Red Team?',
    options: [
      'Un shell que procesa comandos en orden inverso de prioridad usando un scheduler LIFO (Last-In-First-Out) para que el último comando inyectado se ejecute primero en el kernel del objetivo',
      'Una conexión donde la máquina comprometida se conecta al atacante, evadiendo firewalls de entrada',
      'Un procedimiento de respuesta a incidentes que revierte cambios maliciosos restaurando el sistema a un snapshot previo usando Volume Shadow Copy en Windows o LVM snapshots en Linux',
      'Un método de cifrado de comunicaciones de shell que usa TLS mutuo con certificados de cliente para autenticar tanto al atacante como a la víctima en una arquitectura zero-trust',
    ],
    correctIndex: 1,
    explanation: 'En un reverse shell, la víctima inicia la conexión hacia el atacante. Como la conexión sale de la red interna, suele evadir firewalls que bloquean conexiones entrantes.',
    category: 'Red Team',
  },
  {
    id: 19,
    question: '¿Qué es el "lateral movement" (movimiento lateral) en post-explotación?',
    options: [
      'Un ataque de ingeniería social donde el operador se desplaza físicamente por las instalaciones del objetivo para clonar tarjetas RFID y obtener acceso a áreas restringidas del datacenter',
      'Desplazarse desde un sistema comprometido a otros dentro de la misma red',
      'Una táctica de evasión que consiste en rotar entre múltiples puntos de acceso WiFi públicos cada pocos minutos para dificultar la geolocalización del atacante por las fuerzas del orden',
      'Una práctica de higiene de credenciales que rota contraseñas de cuentas de servicio periódicamente usando LAPS para minimizar el impacto de un posible robo de hashes NTLM',
    ],
    correctIndex: 1,
    explanation: 'El movimiento lateral usa credenciales robadas o exploits internos para saltar de una máquina a otra, expandiendo el control dentro de la red objetivo.',
    category: 'Red Team',
  },
  {
    id: 20,
    question: '¿Qué es MITRE ATT&CK?',
    options: [
      'Un framework de pentesting ofensivo que automatiza la explotación de vulnerabilidades CVSS alto siguiendo el kill chain de Lockheed Martin para evaluar la postura defensiva',
      'Una base de conocimiento que cataloga tácticas y técnicas usadas por atacantes en el mundo real',
      'Un sistema de gestión de vulnerabilidades que prioriza parches basándose en el score CVSS v3.1 y el contexto de exposición de activos en el inventario CMDB de la organización',
      'Un protocolo de comunicación segura entre herramientas SOC (SOAR, SIEM, EDR) basado en STIX/TAXII para intercambiar intelligence sobre indicadores de compromiso en tiempo real',
    ],
    correctIndex: 1,
    explanation: 'MITRE ATT&CK documenta tácticas y técnicas usadas por APTs y grupos criminales. El Blue Team lo usa para detectar, clasificar y cazar amenazas.',
    category: 'Blue Team',
  },
  {
    id: 21,
    question: '¿Cuál es la diferencia entre pentesting Black Box y White Box?',
    options: [
      'Black: sin información del objetivo; White: acceso completo al código y arquitectura',
      'Black: las pruebas se ejecutan de noche para evadir detección del SOC; White: se realizan de día con notificación previa al equipo de operaciones para evitar falsos positivos',
      'Black: el alcance se limita exclusivamente a infraestructura de red y servicios expuestos; White: cubre únicamente aplicaciones web y revisión de código fuente',
      'Black: las pruebas se ejecutan automáticamente con scanners como Nessus; White: se realizan manualmente por consultores que revisan cada línea de código con análisis estático',
    ],
    correctIndex: 0,
    explanation: 'Black Box simula un atacante externo sin conocimiento. White Box da acceso total al código fuente y arquitectura para una auditoría más exhaustiva.',
    category: 'Red Team',
  },
  {
    id: 22,
    question: '¿Qué es el "Threat Hunting" (caza de amenazas)?',
    options: [
      'Una técnica de respuesta reactiva que monitorea las alertas del SIEM y ejecuta playbooks de contención automáticamente cuando se supera un umbral de score de riesgo preconfigurado',
      'Búsqueda proactiva de amenazas asumiendo que ya están presentes, sin esperar alertas',
      'Un tipo de pentesting defensivo donde el Blue Team simula ataques APT contra la propia infraestructura para validar la eficacia de los controles de detección y respuesta',
      'Un método automatizado de caza de malware que usa análisis de regresión y aprendizaje automático sobre telemetría de endpoints para identificar binarios maliciosos sin firmas',
    ],
    correctIndex: 1,
    explanation: 'Threat Hunting parte de la hipótesis de que el atacante ya está dentro. El analista busca activamente indicadores y comportamientos anómalos sin esperar alertas automáticas.',
    category: 'Blue Team',
  },
  {
    id: 23,
    question: '¿Qué es la escalada de privilegios en Red Team?',
    options: [
      'Un técnica de exfiltración que sube archivos comprimidos cifrados al servidor comprometido usando HTTP POST tunneling para evadir inspección de DLP y firewalls de salida',
      'Obtener permisos superiores (root/admin) partiendo de un acceso de bajo nivel',
      'Comprometer el mayor número posible de cuentas de usuario estándar mediante credential spraying para ampliar el alcance del ataque horizontal dentro del dominio',
      'Mejorar el rendimiento y ancho de banda de la conexión C2 entre el payload implantado y el servidor de comando y control mediante multiplexación de canales DNS y ICMP',
    ],
    correctIndex: 1,
    explanation: 'La escalada de privilegios transforma un acceso limitado en acceso total, ya sea horizontal (mismos privilegios, otro usuario) o vertical (root/admin).',
    category: 'Red Team',
  },
  {
    id: 24,
    question: '¿Qué es la "contención" en respuesta a incidentes del Blue Team?',
    options: [
      'Eliminar completamente la amenaza del entorno erradicando el malware, parcheando la vulnerabilidad explotada y eliminando todos los artefactos de persistencia del sistema comprometido',
      'Aislar y limitar el alcance del incidente para evitar que se propague',
      'Restaurar los sistemas afectados a partir de copias de seguridad verificadas e inmutables tras validar la integridad del backup con sumas de comprobación SHA-256',
      'Documentar el incidente en un reporte formal con timeline, IOC, IOA y lecciones aprendidas para cumplir con los requisitos de la norma ISO 27001 y el reglamento GDPR',
    ],
    correctIndex: 1,
    explanation: 'La contención aísla sistemas comprometidos (desconexión de red, bloqueo de cuentas, segmentación) para detener la propagación antes de la erradicación.',
    category: 'Blue Team',
  },
  {
    id: 25,
    question: '¿Qué es "pass-the-hash" en Red Team?',
    options: [
      'Compartir hashes entre atacantes',
      'Usar el hash de una contraseña robada para autenticarse sin conocer la contraseña en texto plano',
      'Un método para cifrar contraseñas con hashes',
      'Un tipo de ataque de fuerza bruta contra hashes',
    ],
    correctIndex: 1,
    explanation: 'Pass-the-hash aprovecha cómo protocolos como NTLM usan el hash para autenticar. Con el hash robado de memoria, el atacante se autentica sin descifrar la contraseña.',
    category: 'Red Team',
  },
  {
    id: 26,
    question: '¿Qué es el "hardening" de sistemas en Blue Team?',
    options: [
      'Reforzar físicamente los servidores',
      'Reducir la superficie de ataque cerrando servicios, puertos y aplicando configuraciones seguras',
      'Un método para cifrar discos',
      'Un sistema de monitorización de temperatura',
    ],
    correctIndex: 1,
    explanation: 'El hardening aplica guías de configuración segura (CIS Benchmarks): deshabilitar servicios innecesarios, cerrar puertos, aplicar parches y auditar permisos.',
    category: 'Blue Team',
  },
  {
    id: 27,
    question: '¿Qué es el Single Sign-On (SSO) y qué riesgo principal introduce?',
    options: [
      'Un sistema que elimina todas las contraseñas sin ningún riesgo',
      'Un mecanismo que permite acceder a múltiples aplicaciones con una sola autenticación, pero si se compromete, expone todos los sistemas conectados',
      'Un tipo de firewall de aplicación',
      'Un método para firmar digitalmente documentos',
    ],
    correctIndex: 1,
    explanation: 'SSO centraliza la autenticación: una sola credencial abre todas las aplicaciones. Esto mejora la usabilidad pero crea un punto único de fallo si el proveedor de identidad es comprometido.',
    category: 'Autenticación',
  },
  {
    id: 28,
    question: '¿Qué es la autenticación adaptativa o basada en riesgo?',
    options: [
      'Autenticación que cambia la contraseña automáticamente cada día',
      'Un enfoque que ajusta los requisitos de verificación según el nivel de riesgo del acceso (ubicación, dispositivo, horario, comportamiento)',
      'Un sistema que solo permite acceso desde una IP fija',
      'Un método que usa inteligencia artificial para adivinar la contraseña',
    ],
    correctIndex: 1,
    explanation: 'La autenticación adaptativa evalúa señales de riesgo en tiempo real: si el acceso parece inusual (país nuevo, dispositivo desconocido, horario anómalo), exige MFA adicional o bloquea el acceso.',
    category: 'Autenticación',
  },
  {
    id: 29,
    question: '¿Qué son los tokens JWT y qué vulnerabilidad crítica pueden tener?',
    options: [
      'Un tipo de virus que infecta bases de datos',
      'Tokens JSON firmados para autenticación stateless; si el algoritmo de firma se configura como "none" o la clave se filtra, un atacante puede falsificar tokens',
      'Un protocolo de transferencia de archivos JSON',
      'Un método para comprimir datos de autenticación',
    ],
    correctIndex: 1,
    explanation: 'Los JWT contienen claims firmados digitalmente. La vulnerabilidad "alg: none" permite a un atacante modificar el token y eliminar la firma. La clave de firma debe protegerse y nunca exponerse en el cliente.',
    category: 'Autenticación',
  },
  {
    id: 30,
    question: '¿Qué es el "session hijacking" (secuestro de sesión)?',
    options: [
      'Un ataque que roba el identificador de sesión válido de un usuario para suplantarlo sin necesidad de conocer su contraseña',
      'Un método para crear múltiples sesiones simultáneas',
      'Un tipo de cifrado de sesiones',
      'Un sistema de respaldo de sesiones',
    ],
    correctIndex: 0,
    explanation: 'El secuestro de sesión roba el token o cookie de sesión (mediante XSS, sniffing de red o acceso físico). El atacante usa ese token para acceder como la víctima sin needing la contraseña. HTTPS, cookies HttpOnly y Secure mitigan este riesgo.',
    category: 'Autenticación',
  },
  {
    id: 31,
    question: '¿Qué es la "federación de identidades" (SAML/OAuth/OIDC)?',
    options: [
      'Un sistema que fusiona todas las identidades en una sola base de datos',
      'Un modelo donde un proveedor de identidad de confianza autentica al usuario y delega esa autenticación a aplicaciones de terceros (Google, Microsoft, etc.)',
      'Un método para eliminar contraseñas de todos los sistemas',
      'Un protocolo para enviar emails cifrados',
    ],
    correctIndex: 1,
    explanation: 'La federación permite que un Identity Provider (IdP) como Google o Azure AD autentique usuarios para aplicaciones externas vía protocolos como SAML, OAuth 2.0 u OIDC, evitando que cada app gestione sus propias credenciales.',
    category: 'Autenticación',
  },
  {
    id: 32,
    question: '¿Qué es un "backdoor" (puerta trasera) en software?',
    options: [
      'Una entrada trasera física al centro de datos',
      'Un método oculto en el código para acceder a un sistema evadiendo la autenticación normal',
      'Un tipo de firewall de red',
      'Una copia de seguridad automática del sistema',
    ],
    correctIndex: 1,
    explanation: 'Un backdoor puede ser introducido deliberadamente por un desarrollador malintencionado o por un atacante tras comprometer el sistema. Permite acceso remoto persistente sin pasar por los controles de seguridad habituales.',
    category: 'Vulnerabilidades',
  },
  {
    id: 33,
    question: '¿Qué es una vulnerabilidad "Race Condition" (condición de carrera)?',
    options: [
      'Una vulnerabilidad que solo aparece cuando el sistema corre muy rápido',
      'Un fallo que ocurre cuando múltiples procesos acceden a un recurso compartido simultáneamente y el resultado depende del orden de ejecución',
      'Un error de red que afecta la velocidad de conexión',
      'Un tipo de ataque de fuerza bruta',
    ],
    correctIndex: 1,
    explanation: 'Las race conditions explotan la falta de sincronización entre hilos/procesos. TOCTOU (Time-of-Check-Time-of-Use) es el patrón más común: el sistema verifica un permiso y luego actúa, pero entre ambos pasos un atacante modifica el recurso.',
    category: 'Vulnerabilidades',
  },
  {
    id: 34,
    question: '¿Qué es "Insecure Deserialization" (deserialización insegura)?',
    options: [
      'Un método para comprimir datos de forma insegura',
      'Una vulnerabilidad donde datos serializados manipulados por un atacante son convertidos a objetos, permitiendo ejecución de código arbitrario',
      'Un tipo de cifrado débil',
      'Un error de validación de formularios web',
    ],
    correctIndex: 1,
    explanation: 'La deserialización insegura ocurre cuando una aplicación convierte datos externos en objetos sin validación. Un atacante puede manipular el payload serializado para inyectar código, escalar privilegios o causar denegación de servicio.',
    category: 'Vulnerabilidades',
  },
  {
    id: 35,
    question: '¿Qué es "SSRF" (Server-Side Request Forgery)?',
    options: [
      'Un ataque que falsifica solicitudes del lado del cliente',
      'Un ataque donde el servidor es engañado para hacer peticiones a recursos internos no accesibles externamente, como servicios en la nube o bases de datos',
      'Un método para acelerar respuestas del servidor',
      'Un tipo de cifrado de solicitudes HTTP',
    ],
    correctIndex: 1,
    explanation: 'SSRF hace que el servidor realice peticiones a URLs controladas por el atacante. Puede exponer servicios internos (metadata de AWS, APIs privadas, bases de datos) que no son accesibles desde fuera de la red.',
    category: 'Vulnerabilidades',
  },
  {
    id: 36,
    question: '¿Qué es "XXE" (XML External Entity)?',
    options: [
      'Un ataque que inyecta entidades XML maliciosas para leer archivos del servidor, escanear puertos internos o causar denegación de servicio',
      'Un formato extendido de XML para datos grandes',
      'Un tipo de cifrado de archivos XML',
      'Un error de validación de esquemas XML',
    ],
    correctIndex: 0,
    explanation: 'XXE explota parsers XML que procesan entidades externas (DTD). Permite al atacante leer archivos locales del servidor (/etc/passwd), realizar SSRF, escanear puertos internos o causar denegación de servicio mediante entidades expansivas.',
    category: 'Vulnerabilidades',
  },
  {
    id: 37,
    question: '¿Qué es un "lock bumping" en seguridad física?',
    options: [
      'Un método para golpear la puerta hasta abrirla',
      'Una técnica que usa una llave especial modificada para abrir cerraduras de pin sin dejar rastros visibles',
      'Un tipo de cerradura de alta seguridad',
      'Un método para reforzar cerraduras existentes',
    ],
    correctIndex: 1,
    explanation: 'El lock bumping usa una llave preparada (bump key) que al ser golpeada transfiere energía a los pins de la cerradura, alineándolos momentáneamente y permitiendo girar el cilindro. Es silencioso y deja poca evidencia de forzado.',
    category: 'Seguridad Física',
  },
  {
    id: 38,
    question: '¿Qué es un "clean desk policy" (política de escritorio limpio)?',
    options: [
      'Una norma de higiene para limpiar el escritorio con productos desinfectantes',
      'Una política que requiere que los empleados guarden o destruyan documentos sensibles al abandonar su escritorio para evitar acceso no autorizado',
      'Un método para optimizar el espacio de trabajo',
      'Una regla sobre el orden de los archivos digitales',
    ],
    correctIndex: 1,
    explanation: 'La política de escritorio limpio garantiza que no queden documentos confidenciales, contraseñas escritas o dispositivos desbloqueados visibles cuando el empleado se ausenta, reduciendo el riesgo de shoulder surfing y robo de información.',
    category: 'Seguridad Física',
  },
  {
    id: 39,
    question: '¿Qué es un "badge cloning" (clonación de tarjetas de acceso)?',
    options: [
      'Un método para imprimir tarjetas de acceso con mejores gráficos',
      'Un ataque que copia los datos de una tarjeta RFID/NFC legítima para crear un duplicado que permite acceso no autorizado a instalaciones físicas',
      'Un sistema de gestión de tarjetas de empleado',
      'Un método para rastrear tarjetas perdidas',
    ],
    correctIndex: 1,
    explanation: 'Las tarjetas RFID de baja frecuencia (125 kHz) son especialmente vulnerables a clonación con dispositivos portátiles. Las tarjetas de alta frecuencia con cifrado (MIFARE DESFire) son más resistentes. El badge cloning permite acceso físico sin forzar la entrada.',
    category: 'Seguridad Física',
  },
  {
    id: 40,
    question: '¿Qué es un "dumpster diving" (revoltura de basura)?',
    options: [
      'Un deporte extremo en contenedores',
      'Una técnica que consiste en revisar la basura o residuos de una organización para encontrar información confidencial, documentos o dispositivos',
      'Un método de reciclaje de hardware',
      'Un tipo de ataque de denegación de servicio',
    ],
    correctIndex: 1,
    explanation: 'El dumpster diving busca documentos con datos sensibles, notas con contraseñas, discos duros no borrados o equipos desechados. La destrucción segura (trituradoras, wiping de discos) y las políticas de gestión de residuos son las defensas principales.',
    category: 'Seguridad Física',
  },
  {
    id: 41,
    question: '¿Qué es "CSRF" (Cross-Site Request Forgery)?',
    options: [
      'Un ataque que falsifica el certificado SSL de un sitio web',
      'Un ataque que engaña al navegador del usuario para que envíe una petición no deseada a una web donde está autenticado, ejecutando acciones en su nombre',
      'Un método para compartir recursos entre sitios web',
      'Un tipo de cifrado cruzado entre dominios',
    ],
    correctIndex: 1,
    explanation: 'CSRF explota la confianza que un sitio tiene en el navegador del usuario. Si el usuario está autenticado, el sitio procesa la petición falsa como legítima. Los tokens anti-CSRF y el atributo SameSite en cookies son las defensas estándar.',
    category: 'Seguridad Web',
  },
  {
    id: 42,
    question: '¿Qué es "IDOR" (Insecure Direct Object Reference)?',
    options: [
      'Un error de diseño de la base de datos',
      'Una vulnerabilidad donde un usuario puede acceder o modificar objetos de otros usuarios manipulando identificadores en la URL o petición',
      'Un método de optimización de consultas',
      'Un tipo de cifrado de objetos en la base de datos',
    ],
    correctIndex: 1,
    explanation: 'IDOR ocurre cuando la aplicación usa identificadores directos (user_id=5, doc_id=123) sin verificar autorización. Un atacante cambia el ID y accede a datos ajenos. La defensa es verificar siempre que el usuario autenticado tiene permiso sobre el recurso solicitado.',
    category: 'Seguridad Web',
  },
  {
    id: 43,
    question: '¿Qué es "Clickjacking" (secuestro de clic)?',
    options: [
      'Un ataque que roba los clics del ratón para generar ingresos publicitarios',
      'Un ataque donde una página maliciosa superpone un elemento transparente sobre otro legítimo, engañando al usuario para que haga clic en algo que no ve',
      'Un método para rastrear clics de usuarios',
      'Un tipo de ataque de denegación de servicio web',
    ],
    correctIndex: 1,
    explanation: 'Clickjacking usa iframes transparentes para superponer contenido malicioso sobre botones legítimos. El usuario cree hacer clic en un botón visible pero realmente interactúa con el contenido oculto. La cabecera X-Frame-Options o CSP frame-ancestors lo previenen.',
    category: 'Seguridad Web',
  },
  {
    id: 44,
    question: '¿Qué son las cabeceras de seguridad HTTP más importantes?',
    options: [
      'Son metadatos que aceleran la carga de la página',
      'Son cabeceras como Content-Security-Policy, X-Frame-Options, X-Content-Type-Options y Strict-Transport-Security que protegen contra XSS, clickjacking, MIME sniffing y degradación de protocolo',
      'Son identificadores de la versión del servidor',
      'Son parámetros de configuración del firewall de red',
    ],
    correctIndex: 1,
    explanation: 'Las cabeceras de seguridad HTTP instruyen al navegador sobre qué comportamiento seguro adoptar. CSP es la más potente: restringe qué scripts, estilos y recursos pueden cargar, previniendo XSS y data exfiltration. HSTS fuerza HTTPS en todas las conexiones.',
    category: 'Seguridad Web',
  },
  {
    id: 45,
    question: '¿Qué es "Path Traversal" (recorrido de rutas)?',
    options: [
      'Un método para optimizar rutas de red',
      'Un ataque que manipula rutas de archivos (../) en entradas de la URL para acceder a archivos fuera del directorio permitido por la aplicación',
      'Un tipo de navegación web segura',
      'Un método de enrutamiento de paquetes',
    ],
    correctIndex: 1,
    explanation: 'Path Traversal usa secuencias como ../../etc/passwd para navegar fuera del directorio web raíz y leer archivos sensibles del servidor. La defensa consiste en sanitizar las rutas de entrada, usar funciones de normalización y restringir el acceso a directorios específicos.',
    category: 'Seguridad Web',
  },
  {
    id: 46,
    question: '¿Qué es el modelo RBAC (Role-Based Access Control)?',
    options: [
      'Un sistema donde los accesos se conceden según el rol del usuario, no su identidad individual, simplificando la gestión de permisos',
      'Un método de cifrado basado en roles',
      'Un sistema de respaldo automático por roles',
      'Un protocolo de comunicación entre roles',
    ],
    correctIndex: 0,
    explanation: 'RBAC asigna permisos a roles (admin, editor, lector) y usuarios a roles. Esto simplifica la administración: cambiar permisos de un rol afecta a todos sus miembros. Es el modelo más común en sistemas empresariales.',
    category: 'Control de Acceso',
  },
  {
    id: 47,
    question: '¿Qué es ABAC (Attribute-Based Access Control) y cómo se diferencia de RBAC?',
    options: [
      'ABAC usa atributos del usuario, recurso y entorno (edad, departamento, hora, ubicación) para decisiones dinámicas; RBAC usa solo el rol',
      'ABAC es más lento que RBAC y por eso no se usa',
      'ABAC y RBAC son exactamente lo mismo',
      'ABAC solo funciona con autenticación biométrica',
    ],
    correctIndex: 0,
    explanation: 'ABAC evalúa atributos dinámicos (usuario: departamento, certificación; recurso: clasificación, propietario; entorno: hora, IP) en cada solicitud, permitiendo políticas más granulares y contextuales que RBAC, que asigna permisos estáticos por rol.',
    category: 'Control de Acceso',
  },
  {
    id: 48,
    question: '¿Qué es "SoD" (Separation of Duties) en control de acceso?',
    options: [
      'Que cada departamento tenga su propia red WiFi',
      'Que tareas críticas requieran intervención de múltiples personas para evitar que un solo individuo cometa fraude o abuso',
      'Que los empleados trabajen en turnos separados',
      'Que cada usuario tenga una contraseña diferente por sistema',
    ],
    correctIndex: 1,
    explanation: 'La separación de funciones distribuye responsabilidades críticas (aprobar pagos, desplegar código, modificar permisos) entre varias personas, de modo que nadie pueda completar una acción sensible sin colaboración. Reduce el riesgo de fraude interno y abuso de privilegios.',
    category: 'Control de Acceso',
  },
  {
    id: 49,
    question: '¿Qué es "Just-in-Time (JIT) access" en control de acceso?',
    options: [
      'Un método para acceder al sistema exactamente a medianoche',
      'Un modelo que concede privilegios elevados temporalmente solo cuando se necesitan y por tiempo limitado, revocándolos automáticamente al expirar',
      'Un sistema de acceso que solo funciona durante horas laborales',
      'Un método para programar accesos futuros',
    ],
    correctIndex: 1,
    explanation: 'JIT access elimina los permisos permanentes de administrador. El usuario solicita acceso elevado con justificación, se aprueba, y se concede por una ventana temporal (30 min, 2 horas). Al expirar, los privilegios se revocan automáticamente, reduciendo la superficie de ataque.',
    category: 'Control de Acceso',
  },
  {
    id: 50,
    question: '¿Qué es "Privilege Creep" (inflación de privilegios)?',
    options: [
      'Un ataque que aumenta los privilegios de un usuario sin su conocimiento',
      'La acumulación gradual de permisos innecesarios cuando un usuario cambia de rol o proyecto sin que se reviquen los permisos antiguos',
      'Un método para escalar privilegios en el sistema',
      'Un tipo de malware que roba permisos',
    ],
    correctIndex: 1,
    explanation: 'El privilege creep ocurre cuando los usuarios conservan permisos de roles anteriores al cambiar de puesto. Con el tiempo acumulan más acceso del necesario, violando el principio de mínimo privilegio. Las revisiones periódicas de acceso (access recertification) lo corrigen.',
    category: 'Control de Acceso',
  },
];

export const practiceQuestions: QuizQuestion[] = [
  {
    id: 101,
    question: '¿Qué es un ataque de ingeniería social?',
    options: [
      'Un ataque que aprovecha vulnerabilidades del sistema operativo',
      'La manipulación psicológica de personas para que revelen información confidencial o realicen acciones',
      'Un tipo de malware que se propaga por la red',
      'Un método para cifrar discos duros',
    ],
    correctIndex: 1,
    explanation: 'La ingeniería social manipula a las personas para que rompan procedimientos de seguridad. El factor humano es a menudo el eslabón más débil.',
    category: 'Ingeniería Social',
  },
  {
    id: 102,
    question: '¿Qué es el ransomware?',
    options: [
      'Un software que elimina archivos de forma permanente',
      'Un malware que cifra los archivos de la víctima y exige un rescate para liberarlos',
      'Un programa para recuperar contraseñas olvidadas',
      'Un tipo de antivirus gratuito',
    ],
    correctIndex: 1,
    explanation: 'El ransomware cifra los datos del usuario y exige un pago (normalmente en criptomonedas) a cambio de la clave de descifrado. Pagar no garantiza la recuperación.',
    category: 'Malware',
  },
  {
    id: 103,
    question: '¿Qué significa el principio de "mínimo privilegio"?',
    options: [
      'Que cada usuario debe tener los permisos mínimos necesarios para realizar su trabajo',
      'Que los administradores no deben tener privilegios especiales',
      'Que todos los usuarios deben compartir la misma cuenta',
      'Que solo se pueden usar contraseñas cortas',
    ],
    correctIndex: 0,
    explanation: 'El principio de mínimo privilegio limita los permisos al nivel estrictamente necesario, reduciendo la superficie de ataque y el impacto de una posible violación.',
    category: 'Control de Acceso',
  },
  {
    id: 104,
    question: '¿Cuál es la diferencia entre un virus y un gusano informático?',
    options: [
      'No hay diferencia, son lo mismo',
      'Un virus necesita un programa anfitrión para propagarse; un gusano se propaga automáticamente por la red',
      'Un gusano solo afecta a correos electrónicos',
      'Un virus es más peligroso que un gusano',
    ],
    correctIndex: 1,
    explanation: 'Los virus se adjuntan a programas legítimos para ejecutarse. Los gusanos son autónomos y se propagan por la red sin intervención del usuario.',
    category: 'Malware',
  },
  {
    id: 105,
    question: '¿Qué es un ataque de fuerza bruta?',
    options: [
      'Un ataque que destruye el hardware del servidor',
      'Un ataque que prueba sistemáticamente todas las combinaciones posibles de contraseñas hasta encontrar la correcta',
      'Un ataque que engaña al usuario para que revele su contraseña',
      'Un ataque que explota una vulnerabilidad conocida del software',
    ],
    correctIndex: 1,
    explanation: 'La fuerza bruta prueba todas las combinaciones posibles. Contraseñas largas y únicas, junto con MFA, son la mejor defensa.',
    category: 'Ataques',
  },
  {
    id: 106,
    question: '¿Qué es el "smishing"?',
    options: [
      'Un ataque de phishing dirigido a través de mensajes SMS',
      'Un tipo de malware que infecta teléfonos móviles',
      'Un método para cifrar mensajes de texto',
      'Un ataque que falsifica el número de teléfono del remitente',
    ],
    correctIndex: 0,
    explanation: 'El smishing es phishing por SMS. Los atacantes envían mensajes con enlaces maliciosos o números de teléfono para robar información personal.',
    category: 'Phishing',
  },
  {
    id: 107,
    question: '¿Qué es un firewall (cortafuegos)?',
    options: [
      'Un hardware que enfría los servidores',
      'Un sistema que monitoriza y controla el tráfico de red basado en reglas de seguridad',
      'Un programa que elimina virus del ordenador',
      'Un tipo de cable de red de alta velocidad',
    ],
    correctIndex: 1,
    explanation: 'Un firewall filtra el tráfico entre redes de confianza y no confiableza, bloqueando conexiones no autorizadas según reglas predefinidas.',
    category: 'Seguridad de Red',
  },
  {
    id: 108,
    question: '¿Qué es el "vishing" (voice phishing)?',
    options: [
      'Un ataque de phishing realizado mediante llamadas telefónicas',
      'Un ataque que falsifica videos',
      'Un tipo de virus que afecta el micrófono',
      'Un método para cifrar llamadas',
    ],
    correctIndex: 0,
    explanation: 'El vishing utiliza llamadas telefónicas para engañar a las víctimas y obtener información confidencial, a menudo suplantando entidades bancarias o de soporte técnico.',
    category: 'Phishing',
  },
  {
    id: 109,
    question: '¿Qué es una VPN (Red Privada Virtual)?',
    options: [
      'Un antivirus que protege contra todo tipo de malware',
      'Un túnel cifrado que protege tu conexión a internet y oculta tu dirección IP',
      'Un tipo de firewall para uso doméstico',
      'Un protocolo para enviar correos electrónicos cifrados',
    ],
    correctIndex: 1,
    explanation: 'Una VPN crea un túnel cifrado entre tu dispositivo y un servidor, protegiendo tus datos en redes no confiables (como WiFi público) y ocultando tu IP.',
    category: 'Seguridad de Red',
  },
  {
    id: 110,
    question: '¿Qué es un certificado digital y para qué sirve?',
    options: [
      'Un documento que prueba que tu antivirus está actualizado',
      'Un archivo que vincula una identidad con una clave pública, permitiendo verificar la autenticidad de un sitio o usuario',
      'Un permiso para navegar por internet libremente',
      'Un tipo de contraseña desechable',
    ],
    correctIndex: 1,
    explanation: 'Los certificados digitales verifican identidad y habilitan HTTPS. Son emitidos por autoridades certificadoras (CA) que validan al titular.',
    category: 'Criptografía',
  },
  {
    id: 111,
    question: '¿Qué es la ingeniería social "pretexting"?',
    options: [
      'Un ataque que utiliza textos preescritos para engañar a la víctima',
      'La creación de un pretexto o escenario falso para obtener información de la víctima',
      'Un método para pre-cifrar archivos',
      'Un tipo de ataque que solo funciona en redes sociales',
    ],
    correctIndex: 1,
    explanation: 'El pretexting crea una narrativa falsa (por ejemplo, suplantar a un compañero de trabajo o a soporte técnico) para ganar confianza y extraer información sensible.',
    category: 'Ingeniería Social',
  },
  {
    id: 112,
    question: '¿Qué es un "zero-day" (día cero)?',
    options: [
      'Una vulnerabilidad que se descubre el mismo día que se lanza el software',
      'Una vulnerabilidad desconocida para el fabricante que aún no tiene parche disponible',
      'Un ataque que solo ocurre en enero',
      'Un software que dura cero días de prueba',
    ],
    correctIndex: 1,
    explanation: 'Un zero-day es una vulnerabilidad aún no parcheada por el fabricante. Al no existir parche, los atacantes pueden explotarla libremente hasta que se publique una solución.',
    category: 'Vulnerabilidades',
  },
  {
    id: 113,
    question: '¿Qué es el "tailgating" o "piggybacking" en seguridad física?',
    options: [
      'Un ataque que sigue a un coche en la autopista',
      'Cuando una persona no autorizada sigue de cerca a alguien autorizado para acceder a un área restringida',
      'Un tipo de malware que se propaga por USB',
      'Un método de cifrado de archivos',
    ],
    correctIndex: 1,
    explanation: 'El tailgating aprovecha la cortesía humana: alguien sostiene la puerta abierta a un extraño que entra detrás de ellos, saltándose controles de acceso físico.',
    category: 'Seguridad Física',
  },
  {
    id: 114,
    question: '¿Qué es el "shoulder surfing"?',
    options: [
      'Un ejercicio de seguridad para fortalecer los hombros',
      'La observación furtiva de la pantalla o teclado de alguien para captar contraseñas o información',
      'Un tipo de ataque de red',
      'Un método para recuperar datos borrados',
    ],
    correctIndex: 1,
    explanation: 'El shoulder surfing consiste en mirar por encima del hombro de alguien para ver lo que escribe, especialmente contraseñas o datos financieros, en lugares públicos.',
    category: 'Seguridad Física',
  },
  {
    id: 115,
    question: '¿Qué es un ataque "Man-in-the-Middle" (MITM)?',
    options: [
      'Un ataque donde el atacante intercepta y posiblemente modifica la comunicación entre dos partes',
      'Un ataque que afecta solo a la memoria del ordenador',
      'Un tipo de phishing por correo electrónico',
      'Un método de copia de seguridad de datos',
    ],
    correctIndex: 0,
    explanation: 'En un MITM, el atacante se interpone entre dos partes sin que lo sepan, interceptando, leyendo o modificando el tráfico. HTTPS y VPN mitigan este ataque.',
    category: 'Ataques',
  },
  {
    id: 116,
    question: '¿Qué es el "DNS poisoning" (envenenamiento DNS)?',
    options: [
      'Un ataque que destruye los servidores DNS',
      'Un ataque que altera las entradas DNS para redirigir a los usuarios a sitios falsos',
      'Un tipo de malware que infecta la caché DNS',
      'Un método para acelerar la navegación web',
    ],
    correctIndex: 1,
    explanation: 'El envenenamiento DNS manipula las resoluciones de nombres de dominio, enviando a las víctimas a sitios maliciosos aunque escriban la URL correcta.',
    category: 'Seguridad de Red',
  },
  {
    id: 117,
    question: '¿Qué es el cifrado de extremo a extremo (E2EE)?',
    options: [
      'Un cifrado que solo protege el primer tramo de la conexión',
      'Un cifrado donde solo el emisor y el receptor pueden leer el mensaje, ni siquiera el proveedor del servicio',
      'Un tipo de firewall para redes domésticas',
      'Un método para duplicar mensajes automáticamente',
    ],
    correctIndex: 1,
    explanation: 'E2EE garantiza que las claves de descifrado solo existen en los dispositivos del emisor y receptor. Ni el propio servicio puede leer el contenido.',
    category: 'Criptografía',
  },
  {
    id: 118,
    question: '¿Qué es el "pharming"?',
    options: [
      'Un ataque que infecta granjas de servidores',
      'Un ataque que redirige el tráfico web a sitios falsos sin que el usuario haga clic en ningún enlace',
      'Un tipo de software agrícola',
      'Un método para cultivar contraseñas',
    ],
    correctIndex: 1,
    explanation: 'El pharming manipula la resolución DNS o archivos locales (hosts) para redirigir a víctimas a sitios fraudulentos automáticamente, sin necesidad de engañarlas con enlaces.',
    category: 'Phishing',
  },
  {
    id: 119,
    question: '¿Qué es el "baiting" (cebo) en ingeniería social?',
    options: [
      'Un ataque que utiliza señuelos físicos o digitales, como USB infectadas o descargas falsas',
      'Un ataque de phishing dirigido a pescadores',
      'Un tipo de firewall de red',
      'Un método para limpiar archivos infectados',
    ],
    correctIndex: 0,
    explanation: 'El baiting ofrece algo atractivo (una USB gratuita, una descarga de película, software pirata) que en realidad contiene malware para infectar al dispositivo de la víctima.',
    category: 'Ingeniería Social',
  },
  {
    id: 120,
    question: '¿Qué es un ataque DDoS (Denegación de Servicio Distribuida)?',
    options: [
      'Un ataque que elimina todos los datos del servidor',
      'Un ataque que satura un servicio con tráfico desde múltiples fuentes hasta dejarlo inaccesible',
      'Un tipo de cifrado que bloquea el acceso a archivos',
      'Un ataque que roba credenciales de usuario',
    ],
    correctIndex: 1,
    explanation: 'DDoS utiliza miles de equipos comprometidos (botnet) para enviar tráfico masivo a un servidor, saturándolo hasta que deja de responder a usuarios legítimos.',
    category: 'Ataques',
  },
  {
    id: 121,
    question: '¿Qué es el "SQL Injection" (inyección SQL)?',
    options: [
      'Un ataque que inyecta virus en bases de datos',
      'Un ataque que inserta código SQL malicioso en campos de entrada para manipular la base de datos',
      'Un método para optimizar consultas SQL',
      'Un tipo de firewall para bases de datos',
    ],
    correctIndex: 1,
    explanation: 'SQL Injection explota campos de entrada no sanitizados para ejecutar comandos SQL arbitrarios, permitiendo leer, modificar o eliminar datos de la base de datos.',
    category: 'Seguridad Web',
  },
  {
    id: 122,
    question: '¿Qué es el "Cross-Site Scripting" (XSS)?',
    options: [
      'Un ataque que permite ejecutar scripts maliciosos en el navegador de otros usuarios de un sitio web',
      'Un método para compartir scripts entre sitios web',
      'Un tipo de cifrado entre sitios',
      'Un ataque que bloquea el acceso a un sitio web',
    ],
    correctIndex: 0,
    explanation: 'XSS inyecta código JavaScript malicioso en páginas vistas por otros usuarios, permitiendo robar cookies de sesión o redirigir a sitios falsos.',
    category: 'Seguridad Web',
  },
  {
    id: 123,
    question: '¿Qué es la autenticación biométrica?',
    options: [
      'Un método que usa características físicas únicas (huellas, rostro, iris) para verificar identidad',
      'Un tipo de antivirus que analiza biología',
      'Un método de cifrado de archivos',
      'Un sistema que mide el tamaño de los archivos',
    ],
    correctIndex: 0,
    explanation: 'La biometría utiliza rasgos físicos únicos para autenticar. Es difícil de falsificar, pero no es infalible: debe combinarse con otros factores (MFA).',
    category: 'Autenticación',
  },
  {
    id: 124,
    question: '¿Qué es un "honeypot" (tarro de miel)?',
    options: [
      'Un software dulce que atrae virus',
      'Un sistema señuelo diseñado para atraer atacantes y estudiar sus técnicas',
      'Un tipo de firewall para uso doméstico',
      'Un método para recuperar contraseñas',
    ],
    correctIndex: 1,
    explanation: 'Un honeypot simula un sistema vulnerable para atraer atacantes. Su propósito es detectar intrusiones, recopilar inteligencia sobre amenazas y desviar ataques de sistemas reales.',
    category: 'Defensa',
  },
  {
    id: 125,
    question: '¿Qué es la seguridad "Zero Trust" (Confianza Cero)?',
    options: [
      'Un modelo que no confía en nada ni nadie, verificando cada solicitud de acceso sin importar su origen',
      'Un sistema que bloquea todas las conexiones por defecto',
      'Un tipo de antivirus que no necesita actualizaciones',
      'Un método para eliminar todas las contraseñas',
    ],
    correctIndex: 0,
    explanation: 'Zero Trust asume que la red ya está comprometida. Verifica cada acceso de forma continua, sin confiar automáticamente en usuarios o dispositivos dentro de la red corporativa.',
    category: 'Defensa',
  },
  {
    id: 126,
    question: '¿Qué es el "phishing de lanza" (spear phishing)?',
    options: [
      'Un ataque de phishing dirigido a un individuo u organización específica con información personalizada',
      'Un ataque que lanza físicamente correos a la basura',
      'Un tipo de phishing que solo funciona en horas laborales',
      'Un método para pescar contraseñas automáticamente',
    ],
    correctIndex: 0,
    explanation: 'El spear phishing personaliza el ataque usando información real de la víctima (nombre, puesto, proyectos) obtenida de redes sociales, aumentando enormemente su eficacia.',
    category: 'Phishing',
  },
  {
    id: 127,
    question: '¿Qué es un "watering hole attack" (ataque de abrevadero)?',
    options: [
      'Un ataque que contamina fuentes de agua',
      'Un ataque que compromete sitios web frecuentados por el objetivo para infectar a sus visitantes',
      'Un tipo de ataque de phishing masivo',
      'Un método para secar recursos del servidor',
    ],
    correctIndex: 1,
    explanation: 'El atacante infecta un sitio web que sabe que las víctimas visitan habitualmente. Cuando estas acceden, se infectan automáticamente sin necesidad de engaño directo.',
    category: 'Ataques',
  },
  {
    id: 128,
    question: '¿Qué es el "principio de defensa en profundidad"?',
    options: [
      'Usar una sola capa de seguridad muy fuerte',
      'Aplicar múltiples capas de seguridad independientes para que si una falla, las demás sigan protegiendo',
      'Cavar fosos profundos alrededor de los servidores',
      'Usar únicamente contraseñas muy largas',
    ],
    correctIndex: 1,
    explanation: 'La defensa en profundidad combina firewalls, antivirus, MFA, cifrado, segmentación de red y políticas, de modo que ningún fallo único comprometa todo el sistema.',
    category: 'Defensa',
  },
  {
    id: 129,
    question: '¿Qué es un "backdoor" (puerta trasera)?',
    options: [
      'Una entrada trasera física al centro de datos',
      'Un método oculto para acceder a un sistema evadiendo los controles de seguridad normales',
      'Un tipo de antivirus silencioso',
      'Una copia de seguridad automática',
    ],
    correctIndex: 1,
    explanation: 'Un backdoor permite acceso remoto oculto a un sistema. Puede ser creado por atacantes (malware) o dejado intencionadamente por desarrolladores, y es extremadamente peligroso.',
    category: 'Vulnerabilidades',
  },
  {
    id: 130,
    question: '¿Qué es la criptografía de clave pública (asimétrica)?',
    options: [
      'Un método donde todos comparten la misma clave',
      'Un sistema que usa un par de claves: una pública para cifrar y otra privada para descifrar',
      'Un tipo de contraseña pública para redes sociales',
      'Un método para publicar claves en internet',
    ],
    correctIndex: 1,
    explanation: 'La criptografía asimétrica usa un par de claves: la pública se comparte para que otros cifren mensajes, y la privada (secreta) descifra. Permite comunicaciones seguras sin compartir secretos previamente.',
    category: 'Criptografía',
  },
  {
    id: 131,
    question: '¿Qué es un ataque "de physhing por CEO" (BEC - Business Email Compromise)?',
    options: [
      'Un ataque que compromete el correo del CEO para enviar órdenes fraudulentas a empleados',
      'Un ataque que elimina la cuenta del CEO',
      'Un tipo de phishing que solo afecta a empresas pequeñas',
      'Un método para cifrar correos corporativos',
    ],
    correctIndex: 0,
    explanation: 'El BEC suplanta a ejecutivos (CEO, CFO) para engañar a empleados con solicitudes urgentes de transferencias bancarias o datos sensibles. Las pérdidas económicas suelen ser muy elevadas.',
    category: 'Ingeniería Social',
  },
  {
    id: 132,
    question: '¿Qué es el "credential stuffing" (relleno de credenciales)?',
    options: [
      'Un método para rellenar formularios automáticamente',
      'Un ataque que prueba pares de usuario/contraseña robados en múltiples sitios web',
      'Un tipo de ataque de fuerza bruta',
      'Un método para guardar contraseñas de forma segura',
    ],
    correctIndex: 1,
    explanation: 'El credential stuffing usa credenciales filtradas en un sitio y las prueba automáticamente en muchos otros, aprovechando que los usuarios reutilizan contraseñas. MFA y contraseñas únicas lo detienen.',
    category: 'Ataques',
  },
  {
    id: 133,
    question: '¿Qué es un "payload" en ciberseguridad?',
    options: [
      'El tamaño total de un archivo malicioso',
      'La parte del malware que ejecuta la acción maliciosa principal',
      'Un método de transporte de datos cifrados',
      'Un tipo de firewall de hardware',
    ],
    correctIndex: 1,
    explanation: 'El payload es la carga útil del malware: el componente que realiza la acción dañina (robar datos, cifrar archivos, abrir backdoor), frente al vector de propagación que solo lo distribuye.',
    category: 'Malware',
  },
  {
    id: 134,
    question: '¿Qué es el "spyware" (software espía)?',
    options: [
      'Un software que protege contra espías',
      'Un malware que recopila información del dispositivo de la víctima sin su conocimiento',
      'Un tipo de software de monitorización legítimo',
      'Un programa para ver películas de espías',
    ],
    correctIndex: 1,
    explanation: 'El spyware captura pulsaciones de teclado (keylogger), capturas de pantalla, historial de navegación y datos personales, enviándolos al atacante de forma silenciosa.',
    category: 'Malware',
  },
  {
    id: 135,
    question: '¿Qué es un "hash" criptográfico?',
    options: [
      'Un símbolo que se usa en programación',
      'Una función que produce una huella digital única de tamaño fijo a partir de datos arbitrarios',
      'Un tipo de contraseña temporal',
      'Un método para comprimir archivos',
    ],
    correctIndex: 1,
    explanation: 'Un hash (SHA-256, bcrypt) genera una salida única y determinista a partir de cualquier entrada. Es irreversible: ideal para guardar contraseñas de forma segura, verificando sin almacenar el texto plano.',
    category: 'Criptografía',
  },
  {
    id: 136,
    question: '¿Qué es el "principio de separación de funciones"?',
    options: [
      'Que cada departamento tenga su propia red',
      'Que tareas críticas requieran intervención de múltiples personas para evitar abuso o fraude',
      'Que los empleados trabajen desde ubicaciones separadas',
      'Que cada usuario tenga una contraseña diferente',
    ],
    correctIndex: 1,
    explanation: 'La separación de funciones distribuye responsabilidades críticas entre varias personas, de modo que nadie pueda completar una acción sensible sin la colaboración de otros.',
    category: 'Control de Acceso',
  },
  {
    id: 137,
    question: '¿Qué es el "malware fileless" (sin archivos)?',
    options: [
      'Un malware que no usa archivos, ejecutándose directamente en memoria para evadir detección',
      'Un malware que borra todos los archivos del disco',
      'Un tipo de antivirus que no guarda archivos',
      'Un método para enviar archivos sin adjuntos',
    ],
    correctIndex: 0,
    explanation: 'El malware fileless opera en memoria (RAM) usando herramientas legítimas del sistema como PowerShell, sin dejar rastros en disco. Es muy difícil de detectar con antivirus tradicionales.',
    category: 'Malware',
  },
  {
    id: 138,
    question: '¿Qué es el "patch management" (gestión de parches)?',
    options: [
      'Un método para parchear ropa',
      'El proceso de aplicar actualizaciones de seguridad al software y sistemas para cerrar vulnerabilidades',
      'Un tipo de firewall de red',
      'Un sistema para gestionar contraseñas',
    ],
    correctIndex: 1,
    explanation: 'La gestión de parches identifica, prueba e instala actualizaciones de seguridad de forma sistemática. Aplicar parches a tiempo es una de las defensas más efectivas contra exploits.',
    category: 'Defensa',
  },
  {
    id: 139,
    question: '¿Qué es un "incident response plan" (plan de respuesta a incidentes)?',
    options: [
      'Un plan de evacuación física del edificio',
      'Un procedimiento documentado para detectar, contener, erradicar y recuperarse de un ciberataque',
      'Un tipo de seguro contra ciberataques',
      'Un método para prevenir todos los ataques',
    ],
    correctIndex: 1,
    explanation: 'Un plan de respuesta a incidentes define roles, pasos y comunicaciones para reaccionar a un ataque: preparación, detección, contención, erradicación, recuperación y lecciones aprendidas.',
    category: 'Defensa',
  },
  {
    id: 140,
    question: '¿Qué es el "OSINT" (Open Source Intelligence)?',
    options: [
      'Un tipo de sistema operativo seguro',
      'La recopilación de información de fuentes públicas para usarla en investigaciones de seguridad',
      'Un software de código abierto para antivirus',
      'Un método para cifrar comunicaciones',
    ],
    correctIndex: 1,
    explanation: 'OSINT recopila datos de fuentes públicas (redes sociales, registros, noticias, foros). Los atacantes lo usan para preparar ataques personalizados; los defensores, para evaluar exposición y amenazas.',
    category: 'Ingeniería Social',
  },
  // ====== RED TEAM: RECONNAISSANCE ======
  {
    id: 201,
    question: '¿Cuál es la primera fase del ciclo de un ataque en un pentest Red Team?',
    options: [
      'Explotación directa de vulnerabilidades',
      'Reconocimiento y recolección de información sobre el objetivo',
      'Escalada de privilegios',
      'Instalación de persistencia',
    ],
    correctIndex: 1,
    explanation: 'El Red Team siempre empieza con reconocimiento: identificar activos, servicios, empleados, tecnologías y superficie de ataque antes de intentar cualquier explotación.',
    category: 'Red Team - Reconocimiento',
  },
  {
    id: 202,
    question: '¿Qué herramienta se usa principalmente para escaneo de puertos y servicios?',
    options: ['Wireshark', 'Nmap', 'Burp Suite', 'Hashcat'],
    correctIndex: 1,
    explanation: 'Nmap es la herramienta estándar para escaneo de red: detecta puertos abiertos, servicios, versiones y sistema operativo del objetivo.',
    category: 'Red Team - Reconocimiento',
  },
  {
    id: 203,
    question: '¿Qué es la enumeración de subdominios y por qué es importante en Red Team?',
    options: [
      'Listar los subdominios del DNS del objetivo para descubrir servicios ocultos o expuestos',
      'Crear subdominos falsos para redirigir tráfico',
      'Eliminar subdominios del objetivo',
      'Cifrar subdominios para ocultarlos',
    ],
    correctIndex: 0,
    explanation: 'La enumeración de subdominios (con herramientas como Sublist3r, Amass o gobuster) revela servicios internos, entornos de desarrollo y paneles de administración expuestos.',
    category: 'Red Team - Reconocimiento',
  },
  {
    id: 204,
    question: '¿Qué es el "footprinting" en Red Team?',
    options: [
      'Dejar huellas falsas para confundir al Blue Team',
      'La recopilación sistemática de información sobre la infraestructura del objetivo sin interactuar directamente con sus sistemas',
      'Un método para borrar rastros tras un ataque',
      'Un tipo de ataque de denegación de servicio',
    ],
    correctIndex: 1,
    explanation: 'El footprinting pasivo recolecta datos (WHOIS, DNS, registros públicos, redes sociales) sin tocar los sistemas del objetivo, evitando detección.',
    category: 'Red Team - Reconocimiento',
  },
  {
    id: 205,
    question: '¿Qué es Shodan y cómo lo usa el Red Team?',
    options: [
      'Un antivirus para servidores industriales',
      'Un buscador de dispositivos conectados a internet que expone servicios, versiones y vulnerabilidades',
      'Una herramienta de cifrado de red',
      'Un protocolo de comunicación IoT',
    ],
    correctIndex: 1,
    explanation: 'Shodan indexa dispositivos expuestos a internet (servidores, cámaras, SCADA, routers). El Red Team lo usa para encontrar servicios vulnerables sin escanear directamente.',
    category: 'Red Team - Reconocimiento',
  },
  // ====== RED TEAM: EXPLOTACIÓN ======
  {
    id: 210,
    question: '¿Qué es un exploit en el contexto de Red Team?',
    options: [
      'Un documento que describe una vulnerabilidad',
      'Código o técnica que aprovecha una vulnerabilidad para obtener acceso o ejecutar comandos en un sistema',
      'Un parche de seguridad aplicado por el fabricante',
      'Un tipo de análisis de tráfico de red',
    ],
    correctIndex: 1,
    explanation: 'Un exploit es el código o método que aprovecha una vulnerabilidad específica. Puede ser local (requiere acceso previo) o remoto (ejecutado a distancia).',
    category: 'Red Team - Explotación',
  },
  {
    id: 211,
    question: '¿Qué es Metasploit y para qué se usa en Red Team?',
    options: [
      'Un framework de gestión de parches',
      'Una plataforma de exploits que automatiza la explotación de vulnerabilidades conocidas',
      'Un sistema de detección de intrusiones',
      'Un herramienta de análisis forense',
    ],
    correctIndex: 1,
    explanation: 'Metasploit contiene miles de exploits, payloads y auxiliares. Permite al Red Team explotar vulnerabilidades, generar payloads y pivotar dentro de la red objetivo.',
    category: 'Red Team - Explotación',
  },
  {
    id: 212,
    question: '¿Qué es un "reverse shell" en Red Team?',
    options: [
      'Un shell que ejecuta comandos en orden inverso',
      'Una conexión donde la máquina comprometida se conecta al atacante, evitando firewalls de entrada',
      'Un método para revertir cambios tras un ataque',
      'Un tipo de cifrado de shell',
    ],
    correctIndex: 1,
    explanation: 'En un reverse shell, la víctima inicia la conexión hacia el atacante. Como la conexión sale de la red interna, suele evadir firewalls que bloquean conexiones entrantes.',
    category: 'Red Team - Explotación',
  },
  {
    id: 213,
    question: '¿Qué es un "bind shell" en Red Team?',
    options: [
      'Un shell que abre un puerto en la máquina objetivo y espera conexiones del atacante',
      'Un shell que une dos conexiones',
      'Un tipo de shell cifrado',
      'Un shell que reinicia el sistema',
    ],
    correctIndex: 0,
    explanation: 'En un bind shell, la máquina objetivo abre un puerto y escucha. El atacante se conecta a él. Es menos usado que el reverse shell porque los firewalls suelen bloquear conexiones entrantes.',
    category: 'Red Team - Explotación',
  },
  {
    id: 214,
    question: '¿Qué es "Buffer Overflow" (desbordamiento de búfer)?',
    options: [
      'Un error de red que satura el búfer de datos',
      'Una vulnerabilidad donde se escriben más datos de los que un búfer puede contener, permitiendo sobrescribir memoria adyacente',
      'Un método para acelerar la transferencia de datos',
      'Un tipo de cifrado de búfer',
    ],
    correctIndex: 1,
    explanation: 'El buffer overflow sobrescribe memoria adyacente con datos controlados por el atacante, permitiendo ejecutar código arbitrario o alterar el flujo del programa.',
    category: 'Red Team - Explotación',
  },
  // ====== RED TEAM: POST-EXPLOTACIÓN ======
  {
    id: 220,
    question: '¿Qué es la "escalada de privilegios" en Red Team?',
    options: [
      'Subir archivos al servidor comprometido',
      'Obtener permisos superiores (root/admin) partiendo de un acceso de bajo nivel',
      'Aumentar el número de cuentas comprometidas',
      'Mejorar la velocidad de conexión',
    ],
    correctIndex: 1,
    explanation: 'La escalada de privilegios transforma un acceso limitado en acceso total. Puede ser horizontal (mismos privilegios, otro usuario) o vertical (root/admin).',
    category: 'Red Team - Post-Explotación',
  },
  {
    id: 221,
    question: '¿Qué es la "persistencia" en post-explotación?',
    options: [
      'Mantener acceso al sistema comprometido tras reinicios o cierres de sesión',
      'Mantener la conexión cifrada permanentemente',
      'Evitar que el sistema se reinicie',
      'Documentar todo el proceso de ataque',
    ],
    correctIndex: 0,
    explanation: 'La persistencia instala mecanismos (tareas programadas, servicios, claves SSH, backdoors) que garantizan que el Red Team pueda volver a acceder aunque el sistema se reinicie.',
    category: 'Red Team - Post-Explotación',
  },
  {
    id: 222,
    question: '¿Qué es el "lateral movement" (movimiento lateral) en Red Team?',
    options: [
      'Moverse físicamente dentro del edificio del objetivo',
      'Desplazarse desde un sistema comprometido a otros sistemas dentro de la misma red',
      'Cambiar de red WiFi frecuentemente',
      'Rotar contraseñas periódicamente',
    ],
    correctIndex: 1,
    explanation: 'El movimiento lateral usa técnicas como pass-the-hash, credenciales robadas o exploits internos para saltar de una máquina a otra, expandiendo el control dentro de la red.',
    category: 'Red Team - Post-Explotación',
  },
  {
    id: 223,
    question: '¿Qué es "pass-the-hash" en Red Team?',
    options: [
      'Compartir hashes entre atacantes',
      'Usar el hash de una contraseña robada para autenticarse sin necesidad de conocer la contraseña en texto plano',
      'Un método para cifrar contraseñas con hashes',
      'Un tipo de ataque de fuerza bruta contra hashes',
    ],
    correctIndex: 1,
    explanation: 'Pass-the-hash aprovecha cómo algunos protocolos (NTLM, SMB) usan el hash para autenticar. Con el hash robado de memoria, el atacante se autentica sin descifrar la contraseña.',
    category: 'Red Team - Post-Explotación',
  },
  {
    id: 224,
    question: '¿Qué es el "pivoting" en Red Team?',
    options: [
      'Girar el servidor comprometido para cambiar su orientación',
      'Usar una máquina comprometida como puente para acceder a redes internas no alcanzables directamente',
      'Cambiar de objetivo durante el ataque',
      'Un método para rotar direcciones IP',
    ],
    correctIndex: 1,
    explanation: 'El pivoting usa un host comprometido como relay para alcanzar subredes internas. Permite al Red Team profundizar en la red corporativa desde un punto de entrada inicial.',
    category: 'Red Team - Post-Explotación',
  },
  // ====== RED TEAM: PENTESTING ======
  {
    id: 230,
    question: '¿Cuál es la diferencia entre pentesting Black Box, Grey Box y White Box?',
    options: [
      'Black: sin información; Grey: información parcial; White: acceso completo al código y arquitectura',
      'Black: de noche; Grey: al amanecer; White: de día',
      'Black: solo red; Grey: solo app; White: solo físico',
      'Black: automático; Grey: semi-automático; White: manual',
    ],
    correctIndex: 0,
    explanation: 'Black Box simula un atacante externo sin conocimiento. Grey Box proporciona credenciales o información parcial. White Box da acceso total al código fuente y arquitectura.',
    category: 'Red Team - Pentesting',
  },
  {
    id: 231,
    question: '¿Qué es Burp Suite y para qué se usa en pentesting?',
    options: [
      'Un escáner de puertos de red',
      'Una herramienta de interceptación y prueba de aplicaciones web (proxy, scanner, intruder)',
      'Un antivirus corporativo',
      'Un gestor de contraseñas',
    ],
    correctIndex: 1,
    explanation: 'Burp Suite es la herramienta principal para pentesting web: intercepta tráfico HTTP, modifica peticiones, escanea vulnerabilidades y automatiza ataques con el módulo Intruder.',
    category: 'Red Team - Pentesting',
  },
  {
    id: 232,
    question: '¿Qué es la "inyección de comandos OS" (OS Command Injection)?',
    options: [
      'Un ataque que ejecuta comandos del sistema operativo a través de entradas no sanitizadas en una aplicación web',
      'Un método para instalar comandos en el sistema',
      'Un tipo de cifrado de comandos',
      'Un ataque que solo afecta a Windows',
    ],
    correctIndex: 0,
    explanation: 'La inyección de comandos OS explota aplicaciones que pasan entrada del usuario a funciones del sistema (system(), exec()) sin sanitizar, permitiendo ejecutar comandos arbitrarios.',
    category: 'Red Team - Pentesting',
  },
  {
    id: 233,
    question: '¿Qué es "SSRF" (Server-Side Request Forgery)?',
    options: [
      'Un ataque que falsifica solicitudes del lado del cliente',
      'Un ataque donde el servidor es engañado para hacer peticiones a recursos internos no accesibles externamente',
      'Un método para acelerar respuestas del servidor',
      'Un tipo de cifrado de solicitudes',
    ],
    correctIndex: 1,
    explanation: 'SSRF hace que el servidor realice peticiones a URLs controladas por el atacante, accediendo a servicios internos (metadata cloud, bases de datos, APIs internas) normalmente protegidos.',
    category: 'Red Team - Pentesting',
  },
  {
    id: 234,
    question: '¿Qué es "XXE" (XML External Entity)?',
    options: [
      'Un ataque que inyecta entidades XML maliciosas para leer archivos locales o realizar SSRF',
      'Un formato de XML extendido',
      'Un tipo de cifrado XML',
      'Un error de validación de esquemas XML',
    ],
    correctIndex: 0,
    explanation: 'XXE explota parsers XML que procesan entidades externas. Permite leer archivos del servidor, escanear puertos internos o causar denegación de servicio.',
    category: 'Red Team - Pentesting',
  },
  // ====== BLUE TEAM: SIEM ======
  {
    id: 301,
    question: '¿Qué es un SIEM (Security Information and Event Management)?',
    options: [
      'Un antivirus de nueva generación',
      'Una plataforma que centraliza, correlaciona y analiza logs de seguridad de toda la organización',
      'Un firewall de próxima generación',
      'Un sistema de gestión de identidades',
    ],
    correctIndex: 1,
    explanation: 'Un SIEM (Splunk, Elastic SIEM, QRadar) recolecta logs de todos los sistemas, los correlaciona y genera alertas en tiempo real, permitiendo detectar amenazas que individualmente parecerían inofensivas.',
    category: 'Blue Team - SIEM',
  },
  {
    id: 302,
    question: '¿Qué es una "regla de correlación" en un SIEM?',
    options: [
      'Una regla que relaciona dos eventos o más para detectar patrones de ataque',
      'Una regla que cifra los logs',
      'Una regla que elimina logs duplicados',
      'Una regla que comprime los logs',
    ],
    correctIndex: 0,
    explanation: 'Las reglas de correlación combinan eventos individuales (login fallido + acceso fuera de horario + descarga de datos) para identificar ataques que un solo evento no revelaría.',
    category: 'Blue Team - SIEM',
  },
  {
    id: 303,
    question: '¿Qué son los "IOC" (Indicators of Compromise)?',
    options: [
      'Indicadores de calidad del sistema',
      'Evidencias forenses (IPs, hashes, dominios) que indican que un sistema ha sido comprometido',
      'Indicadores de rendimiento de red',
      'Métricas de disponibilidad del servicio',
    ],
    correctIndex: 1,
    explanation: 'Los IOC son artefactos observables (IPs maliciosas, hashes de malware, dominos C2, registros de persistencia) que confirman una intrusión. Se comparten entre equipos y plataformas de inteligencia.',
    category: 'Blue Team - SIEM',
  },
  {
    id: 304,
    question: '¿Qué es "log ingestion" en un SIEM?',
    options: [
      'Eliminar logs antiguos para ahorrar espacio',
      'El proceso de recolectar, normalizar y almacenar logs de múltiples fuentes en una plataforma centralizada',
      'Un método para cifrar logs',
      'Un sistema para bloquear logs maliciosos',
    ],
    correctIndex: 1,
    explanation: 'La ingesta de logs recoge eventos de firewalls, servidores, endpoints, apps, etc., los normaliza a un formato común y los indexa para búsqueda y correlación en tiempo real.',
    category: 'Blue Team - SIEM',
  },
  // ====== BLUE TEAM: RESPUESTA A INCIDENTES ======
  {
    id: 310,
    question: '¿Cuáles son las 6 fases del ciclo de respuesta a incidentes (NIST)?',
    options: [
      'Preparación, Detección/Análisis, Contención, Erradicación, Recuperación, Lecciones aprendidas',
      'Escaneo, Explotación, Escalada, Persistencia, Pivoting, Reporte',
      'Reconocimiento, Escaneo, Enumeración, Explotación, Post-explotación, Reporte',
      'Análisis, Diseño, Implementación, Pruebas, Despliegue, Mantenimiento',
    ],
    correctIndex: 0,
    explanation: 'El ciclo NIST cubre desde la preparación previa hasta las lecciones aprendidas. Cada fase tiene objetivos claros: detectar, contener el daño, eliminar la amenaza, restaurar y mejorar.',
    category: 'Blue Team - Respuesta a Incidentes',
  },
  {
    id: 311,
    question: '¿Qué es la "contención" en respuesta a incidentes?',
    options: [
      'Eliminar la amenaza completamente del sistema',
      'Aislar y limitar el alcance del incidente para evitar que se propague',
      'Restaurar los sistemas afectados',
      'Documentar el incidente para el reporte',
    ],
    correctIndex: 1,
    explanation: 'La contención aísla sistemas comprometidos (desconexión de red, bloqueo de cuentas, segmentación) para detener la propagación antes de proceder a la erradicación.',
    category: 'Blue Team - Respuesta a Incidentes',
  },
  {
    id: 312,
    question: '¿Qué es un "playbook" de respuesta a incidentes?',
    options: [
      'Un manual de estrategias de ataque',
      'Un documento con pasos predefinidos y automatizados para responder a un tipo específico de incidente',
      'Un script de pentesting',
      'Un catálogo de vulnerabilidades',
    ],
    correctIndex: 1,
    explanation: 'Un playbook define el flujo paso a paso para cada tipo de incidente (ransomware, phishing, DDoS): qué contener, qué evidencia preservar, a quién escalar y cómo recuperar.',
    category: 'Blue Team - Respuesta a Incidentes',
  },
  {
    id: 313,
    question: '¿Qué es la "cadena de custodia" en análisis forense digital?',
    options: [
      'Una cadena de correos electrónicos sobre el incidente',
      'El registro documentado de quién manejó la evidencia, cuándo y dónde, garantizando su integridad legal',
      'Un método para encriptar evidencias',
      'Un sistema de notificaciones de incidentes',
    ],
    correctIndex: 1,
    explanation: 'La cadena de custodia garantiza que la evidencia digital no ha sido alterada. Registra cada transferencia y manipulación, siendo esencial para que la evidencia sea válida en un juicio.',
    category: 'Blue Team - Respuesta a Incidentes',
  },
  // ====== BLUE TEAM: ANÁLISIS FORENSE ======
  {
    id: 320,
    question: '¿Qué es el "análisis forense digital"?',
    options: [
      'Un análisis financiero de daños por ciberataque',
      'La investigación científica de dispositivos digitales para preservar, recuperar y analizar evidencia',
      'Un método para reparar discos dañados',
      'Un sistema de copias de seguridad',
    ],
    correctIndex: 1,
    explanation: 'El análisis forense digital adquiere, preserva y analiza datos de dispositivos (discos, memoria, red) usando herramientas como Autopsy, FTK o EnCase para reconstruir el incidente.',
    category: 'Blue Team - Forense',
  },
  {
    id: 321,
    question: '¿Qué es una "copia forense" o imagen de disco?',
    options: [
      'Una foto del disco físico',
      'Una copia bit a bit del almacenamiento original, preservando su estado exacto para análisis',
      'Una copia de seguridad comprimida',
      'Un respaldo en la nube',
    ],
    correctIndex: 1,
    explanation: 'La copia forense (con herramientas como dd o FTK Imager) duplica cada bit del disco, incluyendo espacio no asignado y archivos borrados. Se trabaja sobre la copia para no alterar el original.',
    category: 'Blue Team - Forense',
  },
  {
    id: 322,
    question: '¿Qué es el "volcado de memoria" (memory dump) en análisis forense?',
    options: [
      'Eliminar memoria RAM para liberar espacio',
      'Capturar el contenido de la RAM para analizar procesos, conexiones y malware en ejecución',
      'Un error de falta de memoria',
      'Un método para comprimir la memoria',
    ],
    correctIndex: 1,
    explanation: 'El volcado de memoria captura la RAM en un momento dado. Herramientas como Volatility analizan procesos, conexiones de red, claves y malware fileless que solo existen en memoria.',
    category: 'Blue Team - Forense',
  },
  {
    id: 323,
    question: '¿Qué es el "timeline analysis" en forense digital?',
    options: [
      'Un análisis del tiempo de respuesta del sistema',
      'La reconstrucción cronológica de eventos a partir de marcas de tiempo de archivos, logs y registros',
      'Un método para programar tareas forenses',
      'Un análisis del ciclo de vida del hardware',
    ],
    correctIndex: 1,
    explanation: 'El análisis de línea de tiempo ordena eventos por timestamp (MACB: Modified, Accessed, Changed, Birth) para reconstruir qué ocurrió, cuándo y en qué orden durante el incidente.',
    category: 'Blue Team - Forense',
  },
  // ====== BLUE TEAM: THREAT HUNTING ======
  {
    id: 330,
    question: '¿Qué es "Threat Hunting" (caza de amenazas)?',
    options: [
      'Esperar a que el SIEM genere alertas y responder',
      'Búsqueda proactiva de amenazas en la red asumiendo que ya están presentes, sin esperar alertas',
      'Un tipo de pentesting defensivo',
      'Un método para cazar malware automáticamente',
    ],
    correctIndex: 1,
    explanation: 'Threat Hunting parte de la hipótesis de que el atacante ya está dentro. El analista busca activamente indicadores, comportamientos anómalos y técnicas MITRE ATT&CK, sin esperar alertas.',
    category: 'Blue Team - Threat Hunting',
  },
  {
    id: 331,
    question: '¿Qué es el framework MITRE ATT&CK?',
    options: [
      'Un framework de pentesting ofensivo',
      'Una base de conocimiento que cataloga tácticas y técnicas usadas por atacantes en el mundo real',
      'Un sistema de gestión de vulnerabilidades',
      'Un protocolo de comunicación segura',
    ],
    correctIndex: 1,
    explanation: 'MITRE ATT&CK documenta tácticas (reconocimiento, persistencia, exfiltración) y técnicas específicas usadas por APTs y grupos criminales. El Blue Team lo usa para detectar y clasificar amenazas.',
    category: 'Blue Team - Threat Hunting',
  },
  {
    id: 332,
    question: '¿Qué es un "TTP" en ciberseguridad?',
    options: [
      'Tecnologías, Técnicas y Protocolos',
      'Tácticas, Técnicas y Procedimientos: el modus operandi de un atacante o grupo de amenaza',
      'Un protocolo de transferencia segura',
      'Un tipo de prueba de penetración',
    ],
    correctIndex: 1,
    explanation: 'Los TTPs describen cómo opera un atacante: las Tácticas (objetivos), Técnicas (métodos) y Procedimientos (pasos específicos). Identificar TTPs permite detectar al grupo detrás de un ataque.',
    category: 'Blue Team - Threat Hunting',
  },
  {
    id: 333,
    question: '¿Qué es la "hipótesis de caza" en Threat Hunting?',
    options: [
      'Una suposición sobre qué atacante podría atacar en el futuro',
      'Una conjetura fundamentada sobre cómo podría estar operando una amenaza, que guía la búsqueda de evidencia',
      'Un método estadístico de predicción de ataques',
      'Una teoría sobre vulnerabilidades futuras',
    ],
    correctIndex: 1,
    explanation: 'La hipótesis de caza formula qué buscar y por qué (ej: "hay un C2 beaconing en horario nocturno"). El analista busca evidencia que confirme o refuta la hipótesis usando logs, EDR y SIEM.',
    category: 'Blue Team - Threat Hunting',
  },
  // ====== BLUE TEAM: HARDENING ======
  {
    id: 340,
    question: '¿Qué es el "hardening" (endurecimiento) de sistemas?',
    options: [
      'Reforzar físicamente los servidores',
      'El proceso de asegurar un sistema reduciendo su superficie de ataque: cerrar servicios, puertos, y aplicar configuraciones seguras',
      'Un método para cifrar discos',
      'Un sistema de monitorización de temperatura',
    ],
    correctIndex: 1,
    explanation: 'El hardening aplica guías de configuración segura (CIS Benchmarks): deshabilitar servicios innecesarios, cerrar puertos, aplicar parches, configurar políticas de contraseñas y auditar permisos.',
    category: 'Blue Team - Hardening',
  },
  {
    id: 341,
    question: '¿Qué son los "CIS Benchmarks"?',
    options: [
      'Pruebas de rendimiento de sistemas',
      'Guías de configuración segura reconocidas internacionalmente para sistemas operativos, apps y cloud',
      'Un tipo de antivirus corporativo',
      'Métricas de calidad de software',
    ],
    correctIndex: 1,
    explanation: 'CIS Benchmarks proporcionan configuraciones de seguridad específicas y auditables para OS, bases de datos, navegadores y plataformas cloud, reduciendo la superficie de ataque.',
    category: 'Blue Team - Hardening',
  },
  {
    id: 342,
    question: '¿Qué es la "segmentación de red" como medida defensiva?',
    options: [
      'Dividir la red en fragmentos más pequeños para aislar sistemas y limitar el movimiento lateral',
      'Acelerar la red dividiéndola en segmentos',
      'Un método para asignar IPs más rápido',
      'Un sistema de balanceo de carga',
    ],
    correctIndex: 1,
    explanation: 'La segmentación crea zonas aisladas (VLANs, subredes) con controles entre ellas. Si un atacante compromete un segmento, no puede pivotar libremente al resto de la red.',
    category: 'Blue Team - Hardening',
  },
  {
    id: 343,
    question: '¿Qué es un "EDR" (Endpoint Detection and Response)?',
    options: [
      'Un antivirus tradicional mejorado',
      'Una solución que monitoriza endpoints en tiempo real, detecta amenazas y permite responder y aislar dispositivos',
      'Un sistema de gestión de parches',
      'Un protocolo de red segura',
    ],
    correctIndex: 1,
    explanation: 'Un EDR (CrowdStrike, SentinelOne, Defender for Endpoint) va más allá del antivirus: detecta comportamientos anómalos, aísla endpoints comprometidos y proporciona telemetría detallada para forense.',
    category: 'Blue Team - Hardening',
  },
  // ====== MÁS PREGUNTAS GENERALES ======
  {
    id: 150,
    question: '¿Qué es un "APT" (Advanced Persistent Threat)?',
    options: [
      'Un antivirus avanzado de nueva generación',
      'Un grupo de atacantes sofisticados que mantiene acceso prolongado y sigiloso a una red objetivo',
      'Un protocolo de transferencia avanzada',
      'Un tipo de parche de seguridad automático',
    ],
    correctIndex: 1,
    explanation: 'Un APT es un actor de amenazas (a menudo patrocinado por estados) que opera de forma persistente y stealth durante meses o años, exfiltrando datos sin ser detectado.',
    category: 'Ataques',
  },
  {
    id: 151,
    question: '¿Qué es el "cyber kill chain" (cadena de ataque)?',
    options: [
      'Una cadena de bloques de ciberseguridad',
      'Un modelo que describe las etapas de un ciberataque: reconocimiento, armamento, entrega, explotación, instalación, C2, acciones',
      'Un método de cifrado en cadena',
      'Un sistema de notificación de incidentes',
    ],
    correctIndex: 1,
    explanation: 'La kill chain (Lockheed Martin) describe las 7 fases de un ataque. El Blue Team puede detectar y detener el ataque en cualquier eslabón de la cadena.',
    category: 'Ataques',
  },
  {
    id: 152,
    question: '¿Qué es "Malware as a Service" (MaaS)?',
    options: [
      'Un servicio antivirus en la nube',
      'Un modelo de negocio criminal donde se alquilan herramientas de malware en suscripción',
      'Un servicio de análisis de malware',
      'Un método de copia de seguridad de malware',
    ],
    correctIndex: 1,
    explanation: 'MaaS permite a criminales sin conocimientos técnicos alquilar infraestructura de ataque (ransomware, bots, phishing kits) por una cuota o porcentaje, democratizando los ciberataques.',
    category: 'Malware',
  },
  {
    id: 153,
    question: '¿Qué es un "WAF" (Web Application Firewall)?',
    options: [
      'Un firewall tradicional para red',
      'Un firewall especializado que filtra tráfico HTTP/HTTPS para proteger aplicaciones web de ataques como SQLi y XSS',
      'Un antivirus para navegadores',
      'Un sistema de cache web',
    ],
    correctIndex: 1,
    explanation: 'Un WAF inspecta peticiones HTTP y bloquea patrones maliciosos (SQL injection, XSS, CSRF) antes de que lleguen a la aplicación, complementando al firewall de red tradicional.',
    category: 'Seguridad Web',
  },
  {
    id: 154,
    question: '¿Qué es el "security awareness training"?',
    options: [
      'Un entrenamiento físico para guardias de seguridad',
      'Un programa educativo para que los empleados reconozcan y respondan a amenazas de ciberseguridad',
      'Un curso de programación segura',
      'Un simulacro de evacuación',
    ],
    correctIndex: 1,
    explanation: 'El entrenamiento de concienciación enseña a los empleados a detectar phishing, usar contraseñas seguras, manejar datos sensibles y reportar incidentes, reduciendo el factor humano como vector de ataque.',
    category: 'Defensa',
  },
];
