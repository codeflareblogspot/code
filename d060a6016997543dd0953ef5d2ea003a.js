function openUserData(x){
var oathUser=null;
var activeUser = [];
activeUser[0]="ecd5ef267c08834301797c76842d223b";
for(var i=0;i<activeUser.length;i++){
if(x==activeUser[i]){oathUser="authorizeUser";break;}
}
return oathUser;
}
