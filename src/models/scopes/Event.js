module.exports = function (models) {
  const { Event, User } = models;
  
  Event.addScope('default', {
    include: [{
      model: User,
      as: "organizer",
      attributes: ["id", "name", "email"]
    }, {
      model: User,
      as: "attendees",
      attributes: ["id", "name", "email"]
    }]
  });
}