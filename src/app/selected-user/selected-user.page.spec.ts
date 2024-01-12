import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectedUserPage } from './selected-user.page';

describe('SelectedUserPage', () => {
  let component: SelectedUserPage;
  let fixture: ComponentFixture<SelectedUserPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SelectedUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
