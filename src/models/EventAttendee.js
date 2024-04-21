const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class EventAttendee extends Model {
    static associate (models) {
      EventAttendee.belongsTo(models.Event, { foreignKey: 'eventId' });
      EventAttendee.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }

  EventAttendee.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    eventId: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: "events"
        }
      },
      field: "event_id"
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: "users"
        }
      },
      field: "user_id"
    }
  }, {
    sequelize,
    modelName: "EventAttendee",
    tableName: "event_attendees",
    timestamps: false, // Remove this line if you want Sequelize to handle timestamps
  });

  return EventAttendee;
}
