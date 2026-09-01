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
      'Usar el nombre de tu mascota con un número al final',
      'Reutilizar la misma contraseña fuerte en todas tus cuentas',
      'Usar una frase de contraseña única de 12+ caracteres por cuenta, guardada en un gestor de contraseñas',
      'Escribir tus contraseñas en una nota adhesiva bajo el teclado',
    ],
    correctIndex: 2,
    explanation: 'Las frases de contraseña únicas y largas, guardadas en un gestor de contraseñas reputado, eliminan el riesgo de reutilización y resisten ataques de fuerza bruta.',
    category: 'Contraseñas',
  },
  {
    id: 2,
    question: '¿Cuál de los siguientes es el indicador más fuerte de un correo de phishing?',
    options: [
      'El correo está bien formateado y tiene el logotipo de la empresa',
      'Un sentido de urgencia combinado con una solicitud para hacer clic en un enlace o proporcionar credenciales',
      'El correo llega un lunes por la mañana',
      'El correo tiene un archivo adjunto',
    ],
    correctIndex: 1,
    explanation: 'La urgencia combinada con la recolección de credenciales es el patrón psicológico central del phishing, independientemente de la calidad del formato.',
    category: 'Phishing',
  },
  {
    id: 3,
    question: '¿Qué garantiza HTTPS al navegar por un sitio web?',
    options: [
      'Que el sitio web es 100% legítimo y de confianza',
      'Que tu conexión al servidor está cifrada en tránsito',
      'Que el sitio no puede ser hackeado',
      'Que tus datos personales están guardados de forma segura en el servidor',
    ],
    correctIndex: 1,
    explanation: 'HTTPS cifra el tráfico entre cliente y servidor. NO valida las intenciones del sitio — los sitios de phishing también usan HTTPS.',
    category: 'Seguridad Web',
  },
  {
    id: 4,
    question: '¿Por qué es importante la autenticación multifactor (MFA)?',
    options: [
      'Hace que el inicio de sesión sea más lento para que los atacantes se rindan',
      'Añade una segunda prueba de identidad, por lo que una contraseña robada por sí sola no basta para vulnerar la cuenta',
      'Reemplaza la necesidad de una contraseña fuerte',
      'Previene todos los ciberataques por completo',
    ],
    correctIndex: 1,
    explanation: 'MFA añade un factor de autenticación independiente. Aunque la contraseña se filtre, el atacante sigue necesitando el segundo factor.',
    category: 'Autenticación',
  },
  {
    id: 5,
    question: 'Recibes una memoria USB que no esperabas. ¿Cuál es la acción más segura?',
    options: [
      'Conectarla para identificar al dueño por los archivos que contiene',
      'Conectarla pero solo abrir archivos, nunca ejecutar programas',
      'No conectarla; entregarla a TI/seguridad para su análisis',
      'Formatearla inmediatamente y reutilizarla',
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
      'Un tipo de malware que infecta teléfonos móviles',
      'Un método para cifrar mensajes de texto',
      'Un ataque que falsifica el número de teléfono del remitente',
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
      'Un ataque que afecta solo a la memoria del ordenador',
      'Un tipo de phishing por correo electrónico',
      'Un método de copia de seguridad de datos',
    ],
    correctIndex: 0,
    explanation: 'En un MITM, el atacante se interpone entre dos partes sin que lo sepan, interceptando, leyendo o modificando el tráfico. HTTPS y VPN mitigan este ataque.',
    category: 'Ataques',
  },
  {
    id: 8,
    question: '¿Qué es el "credential stuffing" (relleno de credenciales)?',
    options: [
      'Un método para rellenar formularios automáticamente',
      'Un ataque que prueba pares de usuario/contraseña robados en múltiples sitios web',
      'Un tipo de ataque de fuerza bruta',
      'Un método para guardar contraseñas de forma segura',
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
      'Un sistema que bloquea todas las conexiones por defecto',
      'Un tipo de antivirus que no necesita actualizaciones',
      'Un método para eliminar todas las contraseñas',
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
      'Un ataque que lanza físicamente correos a la basura',
      'Un tipo de phishing que solo funciona en horas laborales',
      'Un método para pescar contraseñas automáticamente',
    ],
    correctIndex: 0,
    explanation: 'El spear phishing personaliza el ataque usando información real de la víctima (nombre, puesto, proyectos) obtenida de redes sociales, aumentando enormemente su eficacia.',
    category: 'Phishing',
  },
  {
    id: 11,
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
    id: 12,
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
    id: 13,
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
    id: 14,
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
    id: 15,
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
];
