export const getWhatsappUrl = () => {
    const phone = "919179664894";
    const message = "Hi, I would like to know more about Umrah packages.";
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};
