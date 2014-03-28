// data containers
var appData = {
  views: {},
  models: {},
  routers: {},
  utils: {},
  collections: {},
  adapters: {},
  settings: {},
  data: {},
  helpers: {},
  messages: {},
  services: {},
  events: {},
  forms: {},
  garbage: {},
  storage: {}
};



// settings
appData.settings.rootPath = "http://localhost/admin/";
appData.settings.servicePath = "../services/";
appData.settings.imagePath = appData.settings.rootPath + "common/uploads/";
appData.settings.badgesPath = appData.settings.rootPath + "common/badges/";
appData.settings.iconPath = appData.settings.rootPath + "public/css/assets/";
appData.settings.sportsPath = appData.settings.rootPath + "common/sports/";
appData.settings.promoPath = appData.settings.rootPath + "common/promo/";


appData.settings.getUserService = "getUser.php";
appData.settings.getUsersService = "getUsers.php";
appData.settings.addUserService = "addUser.php";
appData.settings.getSportsService = "getSports.php";
appData.settings.getActivitiesService = "getActivities.php";
appData.settings.getMessagesService = "getMessages.php";
appData.settings.getChallengesService = "getChallenges.php";
appData.settings.createActivityService = "createActivityService.php";
appData.settings.getUserFromFacebookID = "getUserFromFacebookID.php";
appData.settings.facebookUserToSQL = "facebookUserToSQL.php";
appData.settings.addMessageService = "addMessage.php";
appData.settings.getMediaService = "getMedia.php";
appData.settings.createActivityService = "createActivity.php";
appData.settings.getActivityUserService = "getActivityUser.php";
appData.settings.setGoingToActivityService = "setGoingToActivity.php";
appData.settings.getBuurtenService = "getBuurten.php";
appData.settings.getLocationsService = "getLocations.php";
appData.settings.addLocationService = "addLocation.php";
appData.settings.getMyPlannedActivities = "getMyPlannedActivities.php";
appData.settings.getMyActivities = "getMyActivities.php";
appData.settings.getFavouriteSportsService = "getFavouriteSports.php";
appData.settings.addFavouriteSportsService = "addFavouriteSports.php";
appData.settings.getUserFavouriteSportsService = "getUserFavouriteSports.php";
appData.settings.imageUploadService = "uploadService.php";
appData.settings.addPhotoToDatabase = "addPhotoToDatabase.php";
appData.settings.getMyAvatarService = "getMyAvatar.php";
appData.settings.getUserChallengesService = "getUserChallengesService.php";
appData.settings.updateAvatarService = "updateAvatar.php";
appData.settings.getMyChallengesService = "getMyChallenges.php";
appData.settings.joinChallengeService = "joinChallenge.php";
appData.settings.getBadgesService = "getBadges.php";
appData.settings.updateChallengeService = "updateChallengeScore.php";
appData.settings.addSportService = "addSport.php";
appData.settings.getFriendsService = "getMyFriends.php";
appData.settings.addFriendService = "addFriend.php";
appData.settings.getMyInvitationsService = "getMyInvitations.php";
appData.settings.inviteFriendsService = "inviteFriends.php";
appData.settings.handleInvitationsService = "handleInvitation.php";
appData.settings.removeFriendService = "removeFriend.php";
appData.settings.updateUserAvatarService = "updateUserAvatar.php";
appData.settings.uploadMediaNonNativeService = "uploadMediaNonNative.php";
appData.settings.updateActivityService = "updateActivity.php";
appData.settings.getUserMediaService = "getUserMedia.php";


/* Jquery Document Read */
$(document).on("ready", function () {

  appData.router = new appData.routers.AppRouter();
  appData.utils.templates.load(["HomeView", "DashboardActivityView", "EditView"],

  // backbone loaded
  function () {

      // New services class
      appData.services.phpService = new appData.services.PhpServices();
      appData.events.getMessagesSuccesEvent = _.extend({}, Backbone.Events);
      appData.events.getSportsSuccesEvent = _.extend({}, Backbone.Events);
      appData.events.getChallengesSuccesEvent = _.extend({}, Backbone.Events);
      appData.events.getActivitiesSuccesEvent = _.extend({}, Backbone.Events);
      appData.events.getMyActivitiesSuccesEvent = _.extend({}, Backbone.Events);
      appData.events.userLoggedInEvent = _.extend({}, Backbone.Events);
      appData.events.userLoggedInErrorEvent = _.extend({}, Backbone.Events);
      appData.events.userLoggedInPasswordErrorEvent = _.extend({}, Backbone.Events);
      appData.events.createUserEvent = _.extend({}, Backbone.Events);
      appData.events.createUserErrorEvent = _.extend({}, Backbone.Events);
      appData.events.getUserFromFacebookIDEvent = _.extend({}, Backbone.Events);
      appData.events.getUsersSuccesEvent = _.extend({}, Backbone.Events);
      appData.events.facebookUserToSQLEvent = _.extend({}, Backbone.Events);
      appData.events.postMessageSuccesEvent = _.extend({}, Backbone.Events);
      appData.events.getMediaSuccesEvent = _.extend({}, Backbone.Events);
      appData.events.createActivityTabsEvent = _.extend({}, Backbone.Events);
      appData.events.activityUsersSuccesEvent = _.extend({}, Backbone.Events);
      appData.events.goinToActivitySuccesEvent = _.extend({}, Backbone.Events);
      appData.events.getBuurtenEvent = _.extend({}, Backbone.Events);
      appData.events.updateActivitiesEvent = _.extend({}, Backbone.Events);


      // init backbone
      Backbone.history.start();
  });

});
