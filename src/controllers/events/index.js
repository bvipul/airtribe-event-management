const {
  createEventValidator,
  updateEventValidator
} = require("../../validators/event");
const validateRequestSchema = require("../../middleware/validateRequestSchema");
const EventService = require("../../services/event");
const { NotFoundError, AuthorizationError } = require("../../utils/custom-errors");

const eventsController = () => {
  const router = require("express").Router();

  router.post(
    "",
    createEventValidator,
    validateRequestSchema,
    async (req, res) => {
      const { name, city, address, maxPeople } = req.body;
      const { id: createdBy } = req.user;

      const createdEvent = await EventService.create({
        name,
        city,
        address,
        maxPeople,
        createdBy
      });

      return res.status(201).json(createdEvent);
    }
  );

  router.get(
    "",
    async (req, res) => {
      const events = await EventService.getAll();

      return res.status(200).json(events);
    }
  );

  router.get(
    "/:eventId",
    async (req, res) => {
      const eventDetails = await EventService.get(req.params.eventId);
      return res.status(200).json(eventDetails);
    }
  );

  router.put(
    "/:eventId",
    updateEventValidator,
    validateRequestSchema,
    async (req, res) => {
      const { name, city, address, maxPeople } = req.body;

      const existingEvent = await EventService.getById(req.params.eventId);

      if (!existingEvent) {
        throw new NotFoundError({
          message: "event not found!",
          code: "EVENT_NOT_FOUND",
        });
      }

      if (existingEvent.createdBy !== req.user.id) {
        throw new AuthorizationError({
          message: "You are not authorized to update this event",
          code: "UNAUTHORISED"
        });
      }

      await EventService.update(existingEvent.id, {
        name: name || existingEvent.name,
        city: city || existingEvent.city,
        address: address || existingEvent.address,
        maxPeople: maxPeople || existingEvent.maxPeople,
      });

      return res.status(200).json({
        message: "event updated successfully"
      });
    }
  );

  router.delete(
    "/:eventId",
    async (req, res) => {
      const eventId = req.params.eventId;

      const existingEvent = await EventService.getById(eventId);

      if (!existingEvent) {
        throw new NotFoundError({
          message: "event not found!",
          code: "EVENT_NOT_FOUND",
        });
      }

      if (existingEvent.createdBy !== req.user.id) {
        throw new AuthorizationError({
          message: "You are not authorized to delete this event",
          code: "UNAUTHORISED"
        });
      }

      await EventService.delete(eventId);

      return res.status(200).json({
        message: "event deleted successfully"
      });
    }
  )


  return router;
};

module.exports = eventsController();