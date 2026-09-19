// Fixed floating button, visible on every page. Clicking it opens a
// WhatsApp chat with a friendly default message. This is completely
// separate from the Contact form — the form only sends an email.

const WHATSAPP_NUMBER = '917070100897'
const DEFAULT_MESSAGE = "Hi, I'm interested in Sumenar Engineering's products. Could you share more details?"

export default function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-200 hover:scale-110"
    >
      <svg viewBox="0 0 32 32" width="30" height="30" fill="currentColor" aria-hidden="true">
        <path d="M16.001 3C9.107 3 3.5 8.607 3.5 15.5c0 2.34.633 4.53 1.735 6.412L3 29l7.271-2.187A12.44 12.44 0 0 0 16.001 28C22.895 28 28.5 22.393 28.5 15.5S22.895 3 16.001 3zm0 22.7a10.14 10.14 0 0 1-5.174-1.42l-.371-.22-3.83 1.152 1.176-3.735-.242-.383a10.15 10.15 0 0 1-1.56-5.394c0-5.626 4.576-10.2 10.201-10.2 5.626 0 10.2 4.575 10.2 10.2 0 5.627-4.574 10.2-10.2 10.2zm5.593-7.632c-.306-.153-1.81-.893-2.09-.995-.28-.102-.484-.153-.687.153-.204.306-.79.995-.968 1.2-.178.204-.357.23-.663.076-.306-.153-1.292-.476-2.462-1.518-.91-.812-1.524-1.814-1.703-2.12-.178-.306-.019-.472.134-.624.138-.137.306-.357.459-.535.153-.179.204-.306.306-.51.102-.204.05-.383-.026-.535-.076-.153-.687-1.655-.941-2.267-.248-.596-.5-.516-.687-.526-.178-.008-.383-.01-.586-.01-.204 0-.535.076-.815.383-.28.306-1.068 1.043-1.068 2.545 0 1.502 1.093 2.953 1.246 3.157.153.204 2.15 3.283 5.208 4.604.728.314 1.295.502 1.738.642.73.232 1.395.199 1.92.121.586-.088 1.81-.74 2.065-1.454.255-.714.255-1.326.178-1.454-.076-.128-.28-.204-.586-.357z" />
      </svg>
    </a>
  )
}
