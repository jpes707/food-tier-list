import React, { useState } from "react";
 
export default function Create() {
 const [form, setForm] = useState({
   name: "",
   level: "",
 });
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
 
   // When a post request is sent to the create url, we'll add a new record to the database.
   const newPerson = { ...form };
 
   await fetch("http://localhost:8000/content", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newPerson),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 
   setForm({ name: "", level: "" });
 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Create New Record</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="name">Name</label>
         <input
           type="text"
           className="form-control"
           id="name"
           value={form.name}
           onChange={(e) => updateForm({ name: e.target.value })}
         />
       </div>
       <div className="form-group">
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="positionOptions"
             id="positionS"
             value="S"
             checked={form.level === "S"}
             onChange={(e) => updateForm({ level: e.target.value })}
           />
           <label htmlFor="positionS" className="form-check-label">S</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="positionOptions"
             id="positionA"
             value="A"
             checked={form.level === "A"}
             onChange={(e) => updateForm({ level: e.target.value })}
           />
           <label htmlFor="positionA" className="form-check-label">A</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="positionOptions"
             id="positionB"
             value="B"
             checked={form.level === "B"}
             onChange={(e) => updateForm({ level: e.target.value })}
           />
           <label htmlFor="positionB" className="form-check-label">B</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="positionOptions"
             id="positionC"
             value="C"
             checked={form.level === "C"}
             onChange={(e) => updateForm({ level: e.target.value })}
           />
           <label htmlFor="positionB" className="form-check-label">C</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="positionOptions"
             id="positionF"
             value="F"
             checked={form.level === "F"}
             onChange={(e) => updateForm({ level: e.target.value })}
           />
           <label htmlFor="positionB" className="form-check-label">F</label>
         </div>
       </div>
       <div className="form-group">
         <input
           type="submit"
           value="Create person"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}