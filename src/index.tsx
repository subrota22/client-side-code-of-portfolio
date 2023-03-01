@import "~@sl-codeblaster/react-3d-animated-card/dist/index.css";
.navBg{
  background-color: rgba(0, 0, 255, 0.2);
  padding: 25px 0px;
  font-size: 15px;
  font-weight: bold;
  text-align: center;
  color: white;
}
.carouselItem{
height: 455px;
border-radius: 20px;
}
.skillText{
animation: skillText infinite forwards 2s alternate;
}
@keyframes skillText {
  from{ opacity: 1; } to{opacity: 0.5;}
}
.body{
background-color:#060631;
color: white;
font-family: 'Raleway', sans-serif;
}
.body::-webkit-scrollbar{
width: 12px;
background-color: indigo;
}
.body::-webkit-scrollbar-thumb{
background-color: darkslategray;
border-radius: 15px;
}
.subrotaImage{
transform:rotateX(-20deg) rotateY(-20deg);
margin: 25px 10px;
animation: subrotaPic infinite forwards 1s alternate;
}
.subrotaImage:hover{
  transform:rotateX(0deg) rotateY(0deg) scale(0.8);
  transition: transform 1s;
  border: 3px do;
  animation: none;
}
@keyframes subrotaPic {
  from{ box-shadow:  0 0 2px 4px rgba(0, 255, 0, 0.808) ; } to{box-shadow:  0 0 4px 8px rgb(10, 13, 233) ;}
}
.authorImage{
height: 55px;
width: 55px;
border: 2px solid green;
margin: 12px 0px;
}
.downloadIcon{
animation: downloadIcon infinite  1s alternate-reverse;
}
@keyframes downloadIcon {
  from{ transform: translateY(5px); } to{transform: translateY(-5px);}
}
.resumeDirection{
  animation: resumeDirection infinite  1s alternate-reverse;
}
@keyframes resumeDirection {
  from{ transform: translateY(5px); } to{transform: translateY(-5px);}
}
.myImage{
  height: 250px;
  margin-bottom: 25px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}

.aboutPage{
height: 50%;
width: 50%;
margin: auto;
margin-top: 45px;
margin-bottom: 45px;
}

.cardBackground{
padding-bottom: 25px;
border-radius: 25px;
box-shadow: 0 0 2px 3px rgba(0, 255, 0, 0.5);
width: 95%;
}
.cardBackground:hover{
  box-shadow: 0 0 2px 3px #D5DC0A;
  transition-duration: 2s;
  cursor: pointer;
}
.hiddenArrow{
  display:none;
}
.showRightArrow:hover > .hiddenArrow {
  display: block;
}
.showDetailsAnimation{
animation: arrowSign infinite forwards alternate 1s;
padding-left: 20px;
visibility: hidden;
}
.hideBtn:hover > .showDetailsAnimation{visibility: visible; transition-duration: 2s;}
@keyframes arrowSign {
  0%{
    transform: translateX(20px);
  } 100%{
    transform: translateX(-20px);
  }
}
.sendSign{
  visibility: hidden;
  animation: sendMessage infinite forwards alternate 1s;
}
@keyframes sendMessage {
  0%{
    transform: translateX(10px);
  } 100%{
    transform: translateX(-20px);
  }
}
.sendBtn:hover > .sendSign {visibility: visible;}

.userInfoCard{
  border: 2px solid blue; margin: 0px 15px; border-radius: 10px; padding-top: 10px;
  height: auto; width:30%;
}

#deleteUsersButtonHide{
display: none;
transition: display 2s;
}
#deleteUsersButtonShow{
display: block;
transition: display 2s;
}