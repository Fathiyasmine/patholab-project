//Button de retour en haut qui apparait quand le scroll est a +300 verticalement:

function BackToTop() {
  //Creer le button :
  let backToTop = document.createElement("button");
  backToTop.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
  //attribution de className:
  backToTop.className = "backTop";
  //style css :
  backToTop.style.cssText = `
  position:fixed;
  bottom:20px;
  right:20px;
  width:50px;
  height:50px;
  background:linear-gradient(45deg, #2ad2c1, #a7f1ac);
  color:white;
  border:none;
  border-radius:50%;
  cursor:pointer;
  display:none;
  z-index:1000;
  font-size:18px;
   box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        transition: all 0.3s ease;

  `;
  //ajout du button a la page HTML (DOM)
  document.body.appendChild(backToTop);

  //Afficher et masquer selon le scroll:
  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      backToTop.style.display = "block";
    } else {
      backToTop.style.display = "none";
    }
  });
  //Action de button
  backToTop.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }); //Effet Hover:
  backToTop.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.1)";
  });
  backToTop.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1)";
  });
}

//  INITIALISATION
document.addEventListener("DOMContentLoaded", function () {
  BackToTop(); // Appeler la fonction quand la page est chargée
});

//Validation basique du formulaire :

function formValidation() {
  const form = document.querySelector('form[action="sub.php"]'); // HTML: <form action="sub.php" method="post">
  if (form) {
    form.addEventListener("submit", function () {
      e.preventDefault(); //empecher lenvoi avant verification des champs de saisie
      //ON RECUPERE tout les champs de saisie quon doit verifier:
      const name = document.getElementById("username");
      const email = document.getElementById("email");
      const phone = document.getElementById("num");
      const checkbox = document.getElementById("check");
      let isValid = true;
      //variable pour collecter les erreurs de saisie:
      let error = [];

      //validation du nom:
      if (!name.value.trim()) {
        error.push("Veuillez entrez votre nom!");
        name.style.border = "2px solid red";
        //on annule la validation
        isValid = false;
      } else {
        name.style.border = "2px solid #ccc";
      }
      //validation de lemail:
      //creation de regex adequat:
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      //on test lemail saisie sur notre regex:
      if (!emailRegex.test(email.value)) {
        error.push("Email invalide");
        email.style.border = "2px solid red";
        isValid = false;
      } else {
        email.style.border = "2px solid #ccc";
      }
      //validation du telephone:
      if (!phone.value.trim()) {
        error.push("Veuillez entrez votre numero complet");
        phone.style.border = "2px solid red";
        isValid = false;
      } else {
        phone.style.border = "2px solid #ccc";
      }
      //validation de la checkbox:
      if (!checkbox.chicked) {
        error.push("Vous devez accepter les conditions");
        isValid = false;
      }
      if (isValid) {
        alert("Formulaire valide");
      } else {
        alert("Erreur trouves:\n'" + error.join("\n"));
      }
    });
  }
}
//*Animation des compteurs (section 4): jai apris beaucoup de methode que je connaissais pas pour cette parite(threshold,
//*new IntersectionObserver,unobserve...):

function animateCounters() {
  const counters = document.querySelectorAll(".fourth span:nth-of-type(1)"); //dans chaque div .fourth, prend le premier <span>
  //cote observateur:
  const ObserverOptions = {
    threshold: 0.5, //*déclenche quand 50% de l'élément est visible à l'écran (nouvelle chose appris)
    rootMargin: "0px", //pas de marge supplémentaire
  };
  //creation de lintersection Observer:Qu'est-ce que l'IntersectionObserver ?
  //C'est une API JavaScript qui surveille si un élément rentre dans la zone visible de l'écran.
  //*Fonctionnement :
  /*
   *Quand vous scrollez → l'observer vérifie constamment dès qu'un élément devient visible → il déclenche une action
   */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        //entry.isIntersecting = vérifie si l'élément est visible
        const counter = entry.target; //lelement html
        const targetText = counter.textContent; //le texte complet de lelement visible (ex:790k)
        const targetNumber = parseInt(targetText.replace(/[^0-9]/g, "")); ///[^0-9]/g = regex qui trouve tout sauf les chiffres
        //garde juste le nombre (790)
        if (!isNaN(targetNumber)) {
          animateNumber(counter, targetNumber, targetText);
          observer.unobserve(counter); //si cest un nomber=>unobserve = arrête de surveiller pour éviter de re-animer
        }
      }
    });
  }, ObserverOptions);
  //activer l'observation:
  counters.forEach((counter) => observer.observe(counter)); //Lance la surveillance pour chaque compteur trouvé.
}
//l'animation proprement dite :
function animateNumber(element, target, originalText) {
  //element:span a modifier
  //target:nombre final (790)
  //originalText:"790K"
  const suffix = originalText.replace(/[0-9]/g, ""); //garde que les lettres et symboles
  let current = 0; //compteurs commence de 0
  const increment = target / 100; //augmentation par etape(ex: 790/100=7.9), augmente de 7.9 a chaque fois
  const duration = 2000;
  const stepTime = duration / 100; //mise a jour a chaque20ms
  const timer = setInterval(() => {
    current += increment; //augmentation du compteur
    if (current >= target) {
      current = target; //arret au numero final (target)
      clearInterval(timer); //arret de set interval
    }
    element.textContent = Math.floor(current) + suffix;
  }, stepTime);
  //execute le code chaque 20ms,ajoute 7.9 a chaque fois, affiche le nbr arrondi+suffix recuperer au debut
}
document.addEventListener("DOMContentLoaded", function () {
  animateCounters();
});

//smoothScroll:
function smoothScroll() {
  //recuperer les liens avec href#=>//recupere tout les liens dont lattribut href commence par #
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", function () {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        //si lelement existe
        targetElement.scrollIntoView({
          // scrollIntoView=>méthode qui fait défiler la page jusqu'à cet élément
          behavior: "smooth", //defilement fluide (anime) au lieu de saute
          block: "start", //aligne le haut de lelement avec le haut de la page
        });
      }
    });
  });
}
document.addEventListener("DOMContentLoaded", function () {
  smoothScroll();
});
