import TimesheetModel from '../models/timesheets';

const getAllTimesheet = async (req, res) => {
  try {
    const filteredTimesheets = await TimesheetModel.find({})
      .populate('employeeId')
      .populate('projectId')
      .populate('taskId');
    if (filteredTimesheets.length === 0) {
      return res.status(400).json({
        message: "Error on the search's criteria",
        data: null,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Request done',
      data: filteredTimesheets,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: null,
      error: true,
    });
  }
};

const getTimesheetById = async (req, res) => {
  try {
    const timesheet = await TimesheetModel.findById(req.params.id);
    if (!timesheet) {
      return res.status(404).json({
        message: 'The id is wrong',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Request done',
      data: timesheet,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

const createTimesheet = async (req, res) => {
  try {
    const newTimesheet = new TimesheetModel({
      description: req.body.description,
      validated: req.body.validated,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      hours: req.body.hours,
      taskId: req.body.taskId,
      employeeId: req.body.employeeId,
      projectId: req.body.projectId,
    });
    const result = await newTimesheet.save();
    return res.status(201).json({
      message: 'Request done',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: 'Some error ocurred, check the body of the request.',
      data: undefined,
      error: true,
    });
  }
};

const updateTimesheet = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        message: "You've to specify an id",
        data: null,
        error: true,
      });
    }

    const result = await TimesheetModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      },
    );
    if (!result) {
      return res.status(404).json({
        message: 'Timesheet not found',
        data: null,
        error: true,
      });
    }
    return res.status(201).json({
      message: 'Request done',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: error.message,
      data: null,
      error: true,
    });
  }
};

const deleteTimesheet = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        message: "You've to specify an id.",
        data: null,
        error: true,
      });
    }

    const result = await TimesheetModel.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        message: 'Timesheet not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Request done',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

export default {
  createTimesheet,
  getAllTimesheet,
  getTimesheetById,
  updateTimesheet,
  deleteTimesheet,
};
