import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { checker } from './validation/pattern-val';
import { CrudService } from './crud.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // Constructor with user defined Crud service and FormBuilder for validation
  constructor(private fb: FormBuilder, private service: CrudService) {
    this.getPlacements(); // to start with the list
  }

  // Main Registration Form
  // For easy access to form contents
  get vid() { return this.registrationForm.get('id') }
  get vname() { return this.registrationForm.get('name') }
  get vcollege() { return this.registrationForm.get('college'); }
  get vdate() { return this.registrationForm.get('date') }
  get vqualification() { return this.registrationForm.get('qualification') }
  get vyear() { return this.registrationForm.get('year') }

  // Validation
  registrationForm = this.fb.group({
    id: ['', [Validators.required, checker(/^[1-9][0-9]{2}$/)]],
    name: ['', [Validators.required, checker(/^[A-Za-z ]{1,50}$/)]],
    college: ['', [Validators.required, checker(/^[A-Za-z ]{1,50}$/)]],
    date: ['', [Validators.required, checker(/^\d{4}-\d{2}-\d{2}$/)]],
    qualification: ['', [Validators.required, checker(/^[A-Za-z ]{1,50}$/)]],
    year: ['', [Validators.required, checker(/^\d{4}$/)]],
  });
  isFormSubmitted = false; // submit validation

  // On Register Button click
  onSubmit() {
    if (this.registrationForm.valid) {
      this.service.registerPlacement(this.registrationForm.value)
        .subscribe((body) => {
          console.log('Success', body);
          this.registrationForm.reset();
          this.isFormSubmitted = false;
          this.getPlacements();
        }, (err) => {
          console.log(err);
        });
    } else {
      this.isFormSubmitted = true;
    }
  }

  // GET List Of Placements From DB
  listOfPlacement: any = null;
  getPlacements() {
    this.service.listPlacements().subscribe((bodys) => {
      console.log(bodys);
      this.listOfPlacement = bodys;
    }, (err) => console.log(err));
  }

  // Delete Placement from DB
  removePlacement(placement: any) {
    this.service.deletePlacement(placement)
      .subscribe((body) => {
        console.log(body);
        this.getPlacements();
      }, (err) => {
        console.log(err);
      });
  }

  // Modal Form or Edit Form
  // Easy Access for Validation 
  @ViewChild('modalClose') closeBtn!: ElementRef;
  get eid() { return this.editForm.get('id') }
  get ename() { return this.editForm.get('name') }
  get ecollege() { return this.editForm.get('college'); }
  get edate() { return this.editForm.get('date') }
  get equalification() { return this.editForm.get('qualification') }
  get eyear() { return this.editForm.get('year') }

  // Validation
  editForm = this.fb.group({
    id: ['', [Validators.required, checker(/^[1-9][0-9]{2}$/)]],
    name: ['', [Validators.required, checker(/^[A-Za-z ]{1,50}$/)]],
    college: ['', [Validators.required, checker(/^[A-Za-z ]{1,50}$/)]],
    date: ['', [Validators.required, checker(/^\d{4}-\d{2}-\d{2}$/)]],
    qualification: ['', [Validators.required, checker(/^[A-Za-z ]{1,50}$/)]],
    year: ['', [Validators.required, checker(/^\d{4}$/)]],
  });
  isEditSubmitted = false; // error submit validation

  // Object modal of current placement for update
  placementToUpdate = {
    id: "",
    name: "",
    college: "",
    date: "",
    qualification: "",
    year: ""
  };

  // Update method
  updatePlacement(placement: any) {
    this.placementToUpdate = { ...placement };
    this.editForm.patchValue({
      id: placement.id,
      name: placement.name,
      college: placement.college,
      date: placement.date,
      qualification: placement.qualification,
      year: placement.year,
    }); // To get the Modal Form with Old Values

    if (this.editForm.valid) {
      this.service.updatePlacement(this.placementToUpdate).subscribe((body) => {
        console.log(body);
        this.getPlacements();
        this.closeBtn.nativeElement.click();
      }, (err) => {
        console.log(err);
      });
    } else {
      console.log("Not entering the update")
      this.isEditSubmitted = true;
    }
  }
}