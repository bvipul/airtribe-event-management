const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate (models) {
      Event.belongsTo(models.User, {
        foreignKey: "createdBy",
        as: "organizer"
      }); 
      Event.belongsToMany(models.User, {
        through: "EventAttendee",
        foreignKey: 'eventId',
        otherKey: 'userId',
        as: "attendees"
      });
    }
  }

  Event.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    maxPeople: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
      field: "max_people"
    },
    createdBy: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: "users"
        }
      },
      field: "created_by"
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "created_at",
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "updated_at",
    }
  }, {
    sequelize,
    modelName: "Event",
    tableName: "events",
    timestamps: false, // Remove this line if you want Sequelize to handle timestamps
  });


  return Event;
}
