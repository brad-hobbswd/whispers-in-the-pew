fetch('/whispers-in-the-pew/partials/footer.html')
.then(response => response.text())
.then(data => {
document.getElementById('footer').innerHTML = data;
});

const courageAndCalling = [
  ["Stones in Your Pockets","StonesInYourPockets.html"],
  ["Ordered Steps, Unshakable Grace","OrderedStepsUnshakableGrace.html"],
  ["Courage in the Face of Crisis","CourageInTheFaceOfCrisis.html"],
  ["The Heart of a Child","TheHeartOfAChild.html"],
  ["Holiness: A Gift, not a Burden","HolinessAGiftNotABurden.html"],
  ["Catching the Outsider—The Jesus Way","CatchingTheOutsider.html"],
  ["The Blessed Life – Walking in the Beatitudes","TheBlessedLife.html"],
  ["Faithful, Not Forceful","FaithfulNotForceful.html"],
  ["Stand Up and Be Counted","StandUpAndBeCounted.html"],
  ["Boldness in Christ — No Fear in the Fire","BoldnessInChrist.html"],
  ["Addiction Prevention — Standing Strong in Christ","AddictionPrevention.html"],
  ["Passing the Torch with Purpose","PassingTheTorch.html"],
  ["Fit for the Kingdom","FitForTheKingdom.html"],
  ["Finding Strength Through Surrender","FindingStrengthThroughSurrender.html"],
  ["Radically Living for Jesus","RadicallyLivingForJesus.html"],
  ["An Addict of Jesus","AnAddictOfJesus.html"],
  ["Stand on the Rock — Even When You Slip","StandOnTheRock.html"],
  ["Unbreakable Bond","UnbreakableBond.html"],
  ["United for the Kingdom","UnitedForTheKingdom.html"],
  ["Your Mess Doesn’t Cancel Your Message","YourMessDoesntCancelYourMessage.html"],
  ["Faith at Work – Being a Light in the Marketplace","faithatworkbeingalightinthemarketplace.html"],
  ["Living with Purpose to Share the Good News","livingwithpurposetosharethegoodnews.html"],
  ["You Should've Killed Me When You Had the Chance","youshouldvekilledmewhenyouhadthechance.html"],
  ["Stir Your Gift with Anticipation and Obedience","stiryourgiftwithanticipationandobedience.html"]
];

function addDevotionNavigation(){
  const file = window.location.pathname.split("/").pop();
  const index = courageAndCalling.findIndex(item => item[1].toLowerCase() === file.toLowerCase());
  if(index === -1 || document.querySelector(".devotion-reading-navigation")) return;

  const nav = document.createElement("nav");
  nav.className = "devotion-reading-navigation";
  nav.setAttribute("aria-label","Devotion navigation");

  const previous = index > 0
    ? `<a href="/whispers-in-the-pew/devotions/${courageAndCalling[index-1][1]}">← Previous<br><span>${courageAndCalling[index-1][0]}</span></a>`
    : `<span class="disabled">← Previous<br><span>Beginning of Section</span></span>`;

  const next = index < courageAndCalling.length - 1
    ? `<a href="/whispers-in-the-pew/devotions/${courageAndCalling[index+1][1]}">Next →<br><span>${courageAndCalling[index+1][0]}</span></a>`
    : `<span class="disabled">Next →<br><span>End of Section</span></span>`;

  nav.innerHTML = `
    <div class="devotion-reading-inner">
      <div class="devotion-reading-side">${previous}</div>
      <a class="devotion-reading-center" href="/whispers-in-the-pew/courageandcalling.html">Section 3<br><span>Courage &amp; Calling</span></a>
      <div class="devotion-reading-side devotion-reading-next">${next}</div>
    </div>
  `;

  const footer = document.getElementById("footer");
  if(footer) footer.parentNode.insertBefore(nav, footer);
  else document.body.appendChild(nav);
}

addDevotionNavigation();
