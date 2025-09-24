const express = require('express');
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); 


const databasePath = path.join(__dirname, 'users.db')
let db=null;

const initializeDbAndServer = async () => {
  try {
    db = await open({
      filename: databasePath,
      driver: sqlite3.Database,
    })

    app.listen(5000, () =>
      console.log('Server Running at http://localhost:5000/'),
    )

  } catch (error) {
    console.log(`DB Error: ${error.message}`)
    process.exit(1)
  }
}

initializeDbAndServer()


app.get("/users", async (req, res) => {
  try {
    let {
      page = 1,
      limit = 10,
      firstName,
      lastName,
      email,
      department,
      sortField = "id",
      sortOrder = "asc",
    } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);
    const offset = (page - 1) * limit;

    // Build filters dynamically
    const conditions = [];
    const values = [];

    if (firstName) {
    conditions.push(`first_name LIKE ?`);
      values.push(`%${firstName}%`);
    }
    if (lastName) {
      conditions.push(`last_name LIKE ?`);
      values.push(`%${lastName}%`);
    }
    if (email) {
      conditions.push(`email LIKE ?`);
      values.push(`%${email}%`);
    }
    if (department) {
      conditions.push(`department LIKE ?`);
      values.push(`%${department}%`);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    // Sorting
    const validSortFields = ["id", "first_name", "last_name", "email", "department"];
    if (!validSortFields.includes(sortField)) sortField = "id";
    if (!["asc", "desc"].includes(sortOrder.toLowerCase())) sortOrder = "asc";

    // Count query
    const countQuery = `SELECT COUNT(*) as count FROM users ${whereClause}`;
    const totalResult = await db.get(countQuery, values);
    const total = totalResult.count;

    // Data query
    const query = `
      SELECT * FROM users 
      ${whereClause} 
      ORDER BY ${sortField} ${sortOrder.toUpperCase()}
      LIMIT ? OFFSET ?
    `;
    const users = await db.all(query, [...values, limit, offset]);

    res.json({
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Get user by ID
app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await db.get(`SELECT * FROM users WHERE id = ?`, [id]);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.post("/users",async (req,res)=>{
    try{
        const { 
    firstName,
    lastName ,
    email,
    department}=req.body;
     if (!firstName || !lastName || !email || !department) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const query=`insert into users( 
    first_name , 
    last_name , 
    email, 
    department ) 
    values (?,?,?,?)`;
    await db.run(query,[firstName,lastName,email,department])
    res.status(201).json({message:"User created successfully"})
    }catch (error){
        console.error("error creating user:",error)
        res.status(500).json({error:"Internal server error"})
    }
})


app.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, department } = req.body;

    // Check if user exists
    const existingCustomer = await db.get(
      `SELECT * FROM users WHERE id = ?`,
      [id]
    );
    if (!existingCustomer) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update query
    const updateQuery = `
      UPDATE users
      SET 
        first_name = COALESCE(?, first_name),
        last_name = COALESCE(?, last_name),
        email = COALESCE(?, email),
        department = COALESCE(?, department)
      WHERE id = ?
    `;
    await db.run(updateQuery, [firstName, lastName, email, department, id]);

    // Fetch updated user
    const updatedUser = await db.get(`SELECT * FROM users WHERE id = ?`, [id]);

    // Send response
    res.json({
      message: "User updated successfully",
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



app.delete("/users/:id",async (req,res)=>{
    try{
     const {id}=req.params; 
    // Check if customer exists
    const existingCustomer = await db.get(`SELECT * FROM users WHERE id = ?`, [id]);
    if (!existingCustomer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    await db.run("Delete from users where id=?",[id])
    res.status(200).json({message:"User deleted successfully"})

    }catch (error){
        console.error("error deleting user:",error);
        res.status(500).json({error:"Internal server error"});
    }
})



module.exports=app;