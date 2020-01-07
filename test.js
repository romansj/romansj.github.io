//šī ir alternatīva, ka sūtīt formu (taisīju 2 veidus, jo nezināju, ka tā web lapa nestrādā. skat. test.html)

document.addEventListener("DOMContentLoaded", function() {
      document.getElementsByTagName('form')[0].addEventListener('submit', (event) => {
        event.preventDefault();

        //veic pārbaudi, vai viss ir pareizi
        //ja viss pareizi, sūti

        // TODO do something here to show user that form is being submitted
        fetch(event.target.action, {
          method: 'POST',
          body: new URLSearchParams(new FormData(event.target)) // event.target is the form
        }).then((resp) => {
          console.log(resp.json());
          return resp.json(); // or resp.text() or whatever the server sends
        }).then((body) => {
          console.log(body);
          // TODO handle body
        }).catch((error) => {
          console.log(error);
          // TODO handle error
        });
      });
    }
