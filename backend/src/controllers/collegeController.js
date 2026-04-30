const colleges = require("../data/colleges");

// GET all colleges
exports.getColleges = (req, res) => {
  const { search, location } = req.query;

  let result = colleges;

  if (search) {
    result = result.filter(c =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (location) {
    result = result.filter(c =>
      c.location.toLowerCase() === location.toLowerCase()
    );
  }

  res.json(result);
};

// GET single college
exports.getCollegeById = (req, res) => {
  const college = colleges.find(c => c.id == req.params.id);

  if (!college) {
    return res.status(404).json({ message: "College not found" });
  }

  res.json(college);
};