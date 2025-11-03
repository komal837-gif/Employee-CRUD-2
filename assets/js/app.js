const cl = console.log;


const employeeForm = document.getElementById("employeeForm")
const empDeptControl=document.getElementById("empDept")
const empSalaryControl=document.getElementById("empSalary")
const empNameControl=document.getElementById("empname")
const EmpContainer=document.getElementById("employeeContainer")
const AddEmpBtn=document.getElementById("AddEmpBtn")
const updateEmpBtn=document.getElementById("updateEmpBtn")


let EmpArr;
if(localStorage.getItem("EmpArr")){
	EmpArr = JSON.parse(localStorage.getItem("EmpArr"))
}else{
	EmpArr = [];
}



function getUniqueId(){
	return 'emp' + Date.now(); 
}


const createEmpTr=(arr)=>{
	let result = "";
	arr.forEach((emp,i)=>{
		result+=`<tr id=${emp.EmpId}>
					<td>${i+1}</td>
					<td>${emp.EmpId}</td>
					<td>${emp.name}</td>
					<td>${emp.dept}</td>
					<td>${emp.salary}</td>
					<td><i onclick="onEmpEdit(this)" class="fas fa-edit fa-2x text-success"></i></td>
					<td><i onclick="onEmpRemove(this)" class="fas fa-trash-alt fa-2x text-danger"></i></td>
				</tr>`
	})
	
	EmpContainer.innerHTML = result;
}

createEmpTr(EmpArr);

const onEmpRemove=(ele)=>{
	
	Swal.fire({
	  title: "Are you sure?",
	  text: "You won't to remove this Employee!",
	  icon: "warning",
	  showCancelButton: true,
	  confirmButtonColor: "#3085d6",
	  cancelButtonColor: "#d33",
	  confirmButtonText: "Yes, remove it!"
	}).then((result) => {
	  if (result.isConfirmed) {
		  
		let REMOVE_ID = ele.closest("tr").id;
		cl(REMOVE_ID)
		
		let getIndex = EmpArr.findIndex(emp=>emp.EmpId === REMOVE_ID)
		cl(getIndex)
		
		EmpArr.splice(getIndex,1);
		
		localStorage.setItem("EmpArr",JSON.stringify(EmpArr))
		
		ele.closest("tr").remove();
		
		let alltr = [...document.querySelectorAll("#employeeContainer tr")]
		alltr.forEach((tr,i)=>tr.firstElementChild.innerHTML = i+1)
		
		Swal.fire({
			title:`The Employee with Id ${REMOVE_ID} is removed successfully!!!`,
			timer:3000,
			icon:'success'
		})
	  }
	});
}

const onEmpEdit =(ele)=>{
	let EDIT_ID = ele.closest("tr").id;
	localStorage.setItem("EDIT_ID", EDIT_ID)
	cl(EDIT_ID)
	
	let EDIT_OBJ = EmpArr.find(emp=>emp.EmpId === EDIT_ID)
	cl( EDIT_OBJ)
	
	empNameControl.value = EDIT_OBJ.name;
	empDeptControl.value = EDIT_OBJ.dept;
	empSalaryControl.value = EDIT_OBJ.salary;
	
	AddEmpBtn.classList.add("d-none")
	updateEmpBtn.classList.remove("d-none")
}

const onEmployeeSubmit=(eve)=>{
	
	eve.preventDefault();
	cl("clicked!!!")
	
	let EmpObj={
		name:empNameControl.value,
		dept:empDeptControl.value,
		salary:empSalaryControl.value,
		EmpId:getUniqueId(),
		
	}
	cl(EmpObj)
	employeeForm.reset()
	
	EmpArr.push(EmpObj)
	cl(EmpArr)
	
	localStorage.setItem("EmpArr",JSON.stringify(EmpArr))
	
	let tr = document.createElement("tr")
	tr.id = EmpObj.EmpId;
	tr.innerHTML =`<td>${EmpArr.length}</td>
					<td>${EmpObj.EmpId}</td>
					<td>${EmpObj.name}</td>
					<td>${EmpObj.dept}</td>
					<td>${EmpObj.salary}</td>
					<td><i onclick="onEmpEdit(this)" class="fas fa-edit fa-2x text-success"></i></td>
					<td><i onclick="onEmpRemove(this)" class="fas fa-trash-alt fa-2x text-danger"></i></td>`
		
		EmpContainer.append(tr)
		
		Swal.fire({
			title:`The Employee With ID ${EmpObj.EmpId} added Successfully!!!`,
			icon:'success',
			timer:3000,
		})
}

const onUpdateEmp=()=>{
	let UPDATE_ID = localStorage.getItem("EDIT_ID");
	cl(UPDATE_ID)
	
	UPDATED_OBJ = {
		name:empNameControl.value,
		dept:empDeptControl.value,
		salary:empSalaryControl.value,
		EmpId:UPDATE_ID,
	}
	cl(UPDATED_OBJ)
	employeeForm.reset()

	let getIndex = EmpArr.findIndex(emp=>emp.EmpId === UPDATE_ID)
	cl(getIndex)
	
	EmpArr[getIndex] = UPDATED_OBJ;
	
    localStorage.setItem("EmpArr",JSON.stringify(EmpArr))
	
	let tr = document.getElementById(UPDATE_ID)
	cl(tr)
	
	let trChild = tr.children;
	cl(trChild)
	
	trChild[2].innerText = UPDATED_OBJ.name;
	trChild[3].innerText = UPDATED_OBJ.dept;
	trChild[4].innerText = UPDATED_OBJ.salary;
	
	AddEmpBtn.classList.remove("d-none")
	updateEmpBtn.classList.add("d-none")
	
	Swal.fire({
      title: "Updated",
      text: `The employee with Id ${UPDATE_ID} is updated Successfully.`,
      timer : 3000,
      icon: "success"
    });
  
  localStorage.removeItem("EDIT_ID");
 }



employeeForm.addEventListener("submit",onEmployeeSubmit)
updateEmpBtn.addEventListener("click",onUpdateEmp)