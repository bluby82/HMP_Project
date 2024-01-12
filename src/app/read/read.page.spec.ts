import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReadPage } from './read.page';

describe('ReadPage', () => {
  let component: ReadPage;
  let fixture: ComponentFixture<ReadPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ReadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
