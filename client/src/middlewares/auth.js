export default function auth({ next, router }) {
    if (!localStorage.getItem('jwt')) {
        console.log(localStorage);
        
        return router.push({ name: 'login' });
    } else {
        return next();

    }

}