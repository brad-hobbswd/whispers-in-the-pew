fetch('/whispers-in-the-pew/partials/footer.html')
.then(response => response.text())
.then(data => {
document.getElementById('footer').innerHTML = data;
});

const devotionSections = [
  {
    name: "Faith & Trust",
    page: "faithandtrust.html",
    devotions: ["theroadiknow.html","trustingtheprocesspart1.html","trustingtheprocesspart2.html","mindovermatterpart1.html","mindovermatterpart2.html","faithoverfear.html","whenfearmeetsfaith.html","faithnotjustrules.html","faithandpowerreachingforjesus.html","when-their-faith-feels-distant.html","faithandhopeanchoredandreaching.html","trustbeyondunderstanding.html","toobigtosink.html","youdonthavetobeg.html","godcanandgodwill.html","continuingintheword.html","whenthefoolishbecomefavored.html","nevertoofargone.html","whenfearkeepsyouingodstillcomesclose.html","stillnessbeforethestorm.html","graceintherush.html","seeingisbelieving.html","stopfindingthecloud.html","faith-that-became-mine.html"]
  },
  {
    name: "Healing & Wholeness",
    page: "healingandwholeness.html",
    devotions: ["thestrengthtobebroken.html","breakmetomakeme.html","becomingwhole.html","whenlovebreakswhatitshouldprotect.html","nowthatimbrokenwhatcomesnext.html","embracingafreshstart.html","wheniforgetimnew.html","healingtheheart.html","risingfromthedeep.html","godshealingword.html","thehealingsalt.html","fromseparationtoredemption.html.html","fullyknownfullyloved.html","forwhenyourestillstuck.html","whenhealedpeopleentertheroom.html","whenthefiredoesntreachthem.html","lettinggoforgood.html","unlockingthedoorsoftheheart.html","fillpeoplewithjesusnotjustpews.html","whenyourerunningonempty.html.html","MercyMeetsMeHere.html"]
  },
  {
    name: "Courage & Calling",
    page: "courageandcalling.html",
    devotions: ["StonesInYourPockets.html","OrderedStepsUnshakableGrace.html","CourageInTheFaceOfCrisis.html","TheHeartOfAChild.html","HolinessAGiftNotABurden.html","CatchingTheOutsider.html","TheBlessedLife.html","FaithfulNotForceful.html","StandUpAndBeCounted.html","BoldnessInChrist.html","AddictionPrevention.html","PassingTheTorch.html","FitForTheKingdom.html","FindingStrengthThroughSurrender.html","RadicallyLivingForJesus.html","AnAddictOfJesus.html","StandOnTheRock.html","UnbreakableBond.html","UnitedForTheKingdom.html","YourMessDoesntCancelYourMessage.html","faithatworkbeingalightinthemarketplace.html","livingwithpurposetosharethegoodnews.html","youshouldvekilledmewhenyouhadthechance.html","stiryourgiftwithanticipationandobedience.html"]
  },
  {
    name: "Forgiveness & Redemption",
    page: "forgivenessandredemption.html",
    devotions: ["thedifferenceisintheturn.html","thepowertoturn.html","likeadogreturningtoitsvomit.html","forgivenessdoesntalwaysmeanaccess.html.html","thetruththatsetsyoufree.html","thegodwhoseesandstillsaves.html","nopermissiontoprosper.html","poisonormedicine.html","yourtestimonyissomeonesmedicine.html","hecameforyou.html","whenleaderslieandyouknowit.html","forgettingafterforgiveness.html","nottoforgiveyourself.html"]
  },
  {
    name: "Spiritual Growth & Discipleship",
    page: "spiritualgrowthanddiscipleship.html",
    devotions: ["theplaceoftheheart.html","setapartforhim.html","livingtruthfullybeforegodandothers.html","ifyouarewilling.html","truthbehindcloseddoors.html","whentheanswerdoesntcome.html","poweroveryourtongue.html","dontamenalie.html","powertools.html","fromstorytimetolifeline.html","dontworryaboutanythingprayabouteverything.html","trainedforheaven.html","thespiritandhisgifts.html","convictionleadstolife.html","WhyItMattersSpiritualGifts.html"]
  },
  {
    name: "Heart & Character",
    page: "heartandcharacter.html",
    devotions: ["thesubtledangerofpride.html","confrontationwithoutpride.html.html","searedorsharpened.html","lovebeyondthepew.html","closeinappearancefarinheart.html","loveandreverenceinthehouseofprayer.html","givingfromtheheart.html","youfeltrightbutridiculedaswell.html","onevoiceoneheart.html","TearOpenYourHeart.html","TwoTongues.html"]
  }
];

function addDevotionNavigation(){
  const file = window.location.pathname.split("/").pop();

  for(const section of devotionSections){
    const index = section.devotions.findIndex(item => item.toLowerCase() === file.toLowerCase());
    if(index === -1) continue;

    // Replace any older page-specific navigation with one authoritative navigation.
    document.querySelectorAll(".navigation, .devotion-reading-navigation").forEach(element => element.remove());

    const nav = document.createElement("nav");
    nav.className = "devotion-reading-navigation";
    nav.setAttribute("aria-label","Devotion navigation");

    const previous = index > 0
      ? `<a href="/whispers-in-the-pew/devotions/${section.devotions[index-1]}">← Previous Devotion<br><span>${section.devotions[index-1]}</span></a>`
      : `<span class="disabled">← Previous Devotion<br><span>Beginning of Section</span></span>`;

    const next = index < section.devotions.length - 1
      ? `<a href="/whispers-in-the-pew/devotions/${section.devotions[index+1]}">Next Devotion →<br><span>${section.devotions[index+1]}</span></a>`
      : `<span class="disabled">Next Devotion →<br><span>End of Section</span></span>`;

    nav.innerHTML = `
      <div class="devotion-reading-inner">
        <div class="devotion-reading-side">${previous}</div>
        <a class="devotion-reading-center" href="/whispers-in-the-pew/${section.page}">Section<br><span>${section.name}</span></a>
        <div class="devotion-reading-side devotion-reading-next">${next}</div>
      </div>
    `;

    const footer = document.getElementById("footer");
    if(footer) footer.parentNode.insertBefore(nav, footer);
    else document.body.appendChild(nav);
    return;
  }
}

addDevotionNavigation();
