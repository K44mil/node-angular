import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GroupsService } from '@app/admin/modules/groups/services/groups.service';
import { first } from 'rxjs/operators';

@Component({
    selector: 'admin-group-finder',
    templateUrl: 'admin-group-finder.component.html'
})
export class AdminGroupFinderComponent implements OnInit {
    groupFinderForm: FormGroup;

    groups = [];

    academicYears = [];
    courses = [];
    specializations = [];
    subjects = [];
    levels = [];
    types = [];
    groupsTypes = [];
    groupsNumbers = [];

    @Output()
    formChanged: EventEmitter<string> = new EventEmitter<string>();
    
    constructor(
        private formBuilder: FormBuilder,
        private groupsService: GroupsService
    ) { }

    ngOnInit() {
        this.loadGroups();

        this.groupFinderForm = this.formBuilder.group({
            academicYear: [''],
            course: [''],
            specialization: [''],
            subject: [''],
            level: [''],
            type: [''],
            groupType: [''],
            groupNumber: ['']
        });
    }

    get f() { return this.groupFinderForm.controls; }

    loadGroups() {
        this.groupsService.getGroups('')
            .pipe(first())
            .subscribe(
                res => {   
                    if (res.data.groups) this.groups = res.data.groups;
                    this.fillAcademicYear();
                },
                err => {

                }
            )
    }

    fillAcademicYear() {
        const academicYears = [];
        for (const g of this.groups)
            if (!academicYears.includes(g.academicYear))
                academicYears.push(g.academicYear);
        this.academicYears = academicYears;
    }

    // Print format
    printLevel(level) {
        if (level == 'I') return 'Inż.';
        if (level == 'M') return 'Mgr';
    }

    printType(type) {
        if (type == 'D') return 'Dzienne';
        if (type == 'Z') return 'Zaoczne';
    }

    printGroupType(groupType) {
        if (groupType == 'lab') return 'Laboratorium';
        if (groupType == 'exc') return 'Ćwiczenia';
        if (groupType == 'lec') return 'Wykład';
        if (groupType == 'proj') return 'Projekt';
    }

    // Disable Form selects
    disableCourse() {
        return !this.f.academicYear.value ? '' : null; 
    }

    disableSpecialization() {
        return !this.f.academicYear.value || !this.f.course.value ? '' : null; 
    }

    disableSubject() {
        return !this.f.academicYear.value || !this.f.course.value || !this.f.specialization.value ? '' : null;
    }

    disableLevel() {
        return !this.f.academicYear.value || !this.f.course.value || !this.f.specialization.value || !this.f.subject.value ? '' : null;
    }

    disableType() {
        return !this.f.academicYear.value || !this.f.course.value || !this.f.specialization.value ||
            !this.f.subject.value || !this.f.level.value ? '' : null;
    }

    disableGroupType() {
        return !this.f.academicYear.value || !this.f.course.value || !this.f.specialization.value ||
            !this.f.subject.value || !this.f.level.value || !this.f.type.value ? '' : null;
    }

    disableGroupNumber() {
        return !this.f.academicYear.value || !this.f.course.value || !this.f.specialization.value ||
            !this.f.subject.value || !this.f.level.value ||
            !this.f.type.value || !this.f.groupType.value ? '' : null;
    }

    // (change) listeners
    onChangeAcademicYear() {
        // CLEAR
        this.groupFinderForm.patchValue({
            course: '',
            specialization: '',
            subject: '',
            level: '',
            type: '',
            groupType: '',
            groupNumber: '' 
        });

        const academicYear = this.f.academicYear.value;
        const groups = this.groups.filter(g => g.academicYear == academicYear);

        const courses = [];
        for (const g of groups)
            if (!courses.includes(g.Course.name))
                courses.push(g.Course.name);
        this.courses = courses;
        this.formChanged.emit(null);
    }

    onChangeCourse() {
        // CLEAR
        this.groupFinderForm.patchValue({
            specialization: '',
            subject: '',
            level: '',
            type: '',
            groupType: '',
            groupNumber: '' 
        });

        const academicYear = this.f.academicYear.value;
        const course = this.f.course.value;
        const groups = this.groups.filter(g => g.academicYear == academicYear && g.Course.name == course);

        const specializations = [];
        for (const g of groups)
            if (!specializations.includes(g.Specialization.name))
                specializations.push(g.Specialization.name);
        this.specializations = specializations;
        this.formChanged.emit(null);
    }

    onChangeSpecialization() {
        // CLEAR
        this.groupFinderForm.patchValue({
            subject: '',
            level: '',
            type: '',
            groupType: '',
            groupNumber: '' 
        });

        const academicYear = this.f.academicYear.value;
        const course = this.f.course.value;
        const specialization = this.f.specialization.value;
        const groups = this.groups.filter(g =>  g.academicYear == academicYear && g.Course.name == course && g.Specialization.name == specialization);

        const subjects = [];
        for (const g of groups)
            if (!subjects.includes(g.Subject.name))
                subjects.push(g.Subject.name);
        this.subjects = subjects;
        this.formChanged.emit(null);
    }

    onChangeSubject() {
        // CLEAR
        this.groupFinderForm.patchValue({
            level: '',
            type: '',
            groupType: '',
            groupNumber: '' 
        });

        const academicYear = this.f.academicYear.value;
        const course = this.f.course.value;
        const specialization = this.f.specialization.value;
        const subject = this.f.subject.value;
        const groups = this.groups
            .filter(g =>  g.academicYear == academicYear && g.Course.name == course && g.Specialization.name == specialization && g.Subject.name == subject);
        
        const levels = [];
        for (const g of groups)
            if (!levels.includes(g.level)) levels.push(g.level);
        this.levels = levels;
        this.formChanged.emit(null);
    }

    onChangeLevel() {
        // CLEAR
        this.groupFinderForm.patchValue({
            type: '',
            groupType: '',
            groupNumber: '' 
        });

        const academicYear = this.f.academicYear.value;
        const course = this.f.course.value;
        const specialization = this.f.specialization.value;
        const subject = this.f.subject.value;
        const level = this.f.level.value;

        const groups = this.groups
            .filter(g =>  g.academicYear == academicYear && g.Course.name == course && g.Specialization.name == specialization &&
                     g.Subject.name == subject && g.level == level);

        const types = [];
        for (const g of groups)
            if (!types.includes(g.type)) types.push(g.type);
        this.types = types;
        this.formChanged.emit(null);
    }

    onChangeType() {
        // CLEAR
        this.groupFinderForm.patchValue({
            groupType: '',
            groupNumber: '' 
        });

        const academicYear = this.f.academicYear.value;
        const course = this.f.course.value;
        const specialization = this.f.specialization.value;
        const subject = this.f.subject.value;
        const level = this.f.level.value;
        const type = this.f.type.value;

        const groups = this.groups
            .filter(g =>  g.academicYear == academicYear && g.Course.name == course && g.Specialization.name == specialization &&
                     g.Subject.name == subject && g.level == level && g.type == type);

        const groupsTypes = [];
        for (const g of groups)
            if (!groupsTypes.includes(g.groupType)) groupsTypes.push(g.groupType);
        this.groupsTypes = groupsTypes;
        this.formChanged.emit(null);
    }

    onChangeGroupType() {
        // CLEAR
        this.groupFinderForm.patchValue({
            groupNumber: '' 
        });

        const academicYear = this.f.academicYear.value;
        const course = this.f.course.value;
        const specialization = this.f.specialization.value;
        const subject = this.f.subject.value;
        const level = this.f.level.value;
        const type = this.f.type.value;
        const groupType = this.f.groupType.value;

        const groups = this.groups
            .filter(g =>  g.academicYear == academicYear && g.Course.name == course && g.Specialization.name == specialization &&
                     g.Subject.name == subject && g.level == level && g.type == type && g.groupType == groupType);

        const groupsNumbers = [];
        for (const g of groups)
            if (!groupsNumbers.includes(g.number)) groupsNumbers.push(g.number);
        this.groupsNumbers = groupsNumbers;
        this.formChanged.emit(null);
    }

    onChangeGroupNumber() {
        const academicYear = this.f.academicYear.value;
        const course = this.f.course.value;
        const specialization = this.f.specialization.value;
        const subject = this.f.subject.value;
        const level = this.f.level.value;
        const type = this.f.type.value;
        const groupType = this.f.groupType.value;
        const groupNumber = this.f.groupNumber.value;

        const group = this.groups
            .filter(g =>  g.academicYear == academicYear && g.Course.name == course && g.Specialization.name == specialization &&
                     g.Subject.name == subject && g.level == level && g.type == type && g.groupType == groupType && g.number == groupNumber)[0];

        if (group) this.formChanged.emit(group.id);
        else this.formChanged.emit(null);
    }
}