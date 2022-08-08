import Report from '../models/report_model.js'

const updateReport = async (req, res) => {
  try {
    // if (!req.body.id) {
    //   const newReport = await Report.create({
    //     createdBy: req.user.userId,
    //     initialCost: req.body.initialCost,
      // records: req.body.records,

    //   });  

    //   return res.status(200).send(newReport)
    // }

    const report = await Report.findOneAndUpdate({ createdBy: req.user.userId }, {
      createdBy: req.user.userId,
      initialCost: req.body.initialCost,
      records: req.body.records,
    }, { upsert: true, new: true })
    
    res.status(200).send(report)
  } catch (error) {
    console.log(error)
  }
}

const getReport = async (req, res) => {
  try {
    const report = await Report.findOne({ createdBy: req.user.userId })
    res.status(200).send(report)
  } catch (error) {
    console.log(error)
  }
}

export {
  updateReport,
  getReport
}