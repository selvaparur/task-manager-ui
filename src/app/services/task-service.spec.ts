
import { TestBed, inject } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { TasksModel } from '../taskmodels/Tasks';
import { TaskService } from './task.service';


describe('Task Service Test ', () => {
    let taskService: TaskService;
    let httpClientSpy: { get: jasmine.Spy };   

    // Suit
    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        taskService = new TaskService(<any>httpClientSpy);

        TestBed.configureTestingModule({
            providers: [TaskService]
        });
    });    

    // test
    
    it('Should return an error for task not found', () => {
        const errorResponse = new HttpErrorResponse({
            error: 'validate 404 error',
            status: 404,
            statusText: 'Not Found'
        });

        httpClientSpy.get.and.returnValue({ subscribe: () => errorResponse });

        taskService.getById(1).subscribe(
            users => fail('error case.'),
            error => expect(error.message).toContain('404 - Not found error')
        );
    });
});
