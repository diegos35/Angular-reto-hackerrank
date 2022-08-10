import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RecordTableComponent} from './record-table.component';
import {ChangeDetectionStrategy, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormsModule} from '@angular/forms';

describe('RecordTableComponent', () => {
  let input;
  let submitBtn;
  let amountHeader;

  const getByTestId = (id, compiled) => {
    return compiled.querySelector(`[data-test-id="${id}"]`);
  };

  const pushValue = async (value, fixture) => {
    input.value = value;
    input.dispatchEvent(new Event('change'));
    input.dispatchEvent(new Event('input'));
    submitBtn.click();
    await fixture.whenStable();
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [RecordTableComponent],
      schemas : [CUSTOM_ELEMENTS_SCHEMA]
    })
      .overrideComponent(RecordTableComponent, {
        set: {changeDetection: ChangeDetectionStrategy.Default}
      })
      .compileComponents();
  }));

  const factory = () => {
    const fixture: ComponentFixture<RecordTableComponent> = TestBed.createComponent(RecordTableComponent);
    const component: RecordTableComponent = fixture.componentInstance;
    const compiled = fixture.debugElement.nativeElement;
    input = getByTestId('app-input', compiled);
    submitBtn = getByTestId('submit-button', compiled);
    amountHeader = getByTestId('amount', compiled);
    fixture.detectChanges();
    return {
      fixture, component, compiled
    };
  };

  it('Should render the initial UI as expected', () => {
    const {component, compiled} = factory();
    expect(component).toBeTruthy();
    expect(input.value.trim()).toBeFalsy();
    expect(submitBtn.innerHTML).toBe('Filter');
    const tBody = getByTestId('records-body', compiled);
    expect(tBody.children.length).toEqual(7);
    Array.from(tBody.children).forEach((node: HTMLElement, i) => {
      const tds = Array.from(node.querySelectorAll('td'));
      if (i === 0) {
        expect(tds[1].innerHTML).toEqual('THE HACKERUNIVERSITY DES: CCD+ ID:0000232343');
      } else if (i === 3) {
        expect(tds[1].innerHTML).toEqual('HACKERBANK INC. DES:CCD+ ID: 33375894749');
      } else if(i === 4) {
        expect(tds[1].innerHTML).toEqual('HACKERBANK1 BP DES: MERCH PMT ID:1358570');
      }
    });

  });

  it('Should filter the data by initial date', async () => {
    const {compiled, fixture} = factory();
    await pushValue('2019-11-29', fixture);
    submitBtn.click();
    await fixture.whenStable();
    fixture.detectChanges();
    const tBody = getByTestId('records-body', compiled);
    expect(tBody.children.length).toEqual(3);
    Array.from(tBody.children).forEach((node: HTMLElement, i) => {
      const tds = Array.from(node.querySelectorAll('td'));
      if (i === 0) {
        expect(tds[1].innerHTML).toEqual('HACKERBANK DES: CREDIT O ID:1223232323');
      } else if (i === 1) {
        expect(tds[1].innerHTML).toEqual('HACKERBANK1 BP DES: MERCH PMT ID:1358570');
      }
    });
  });

  it('Should sort the data on clicking the header', async () => {
    const {compiled, fixture} = factory();
    amountHeader.click();
    await fixture.whenStable();
    fixture.detectChanges();
    const tBody = getByTestId('records-body', compiled);
    expect(tBody.children.length).toEqual(7);
    Array.from(tBody.children).forEach((node: HTMLElement, i) => {
      const tds = Array.from(node.querySelectorAll('td'));
      if (i === 0) {
        expect(tds[1].innerHTML).toEqual('HACKERBANK DES: DEBIT O ID:00097494729');
      } else if (i === 2) {
        expect(tds[1].innerHTML).toEqual('THE HACKERUNIVERSITY DES: CCD+ ID:0000232343');
      }
    });
  });


  it('Should show the correct data when sort and filter are done together', async () => {
    const {compiled, fixture} = factory();
    await pushValue('2019-11-29', fixture);
    submitBtn.click();
    amountHeader.click();
    await fixture.whenStable();
    fixture.detectChanges();
    const tBody = getByTestId('records-body', compiled);
    expect(tBody.children.length).toEqual(3);
    Array.from(tBody.children).forEach((node: HTMLElement, i) => {
      const tds = Array.from(node.querySelectorAll('td'));
      if (i === 0) {
        expect(tds[1].innerHTML).toEqual('HACKERBANK DES: DEBIT O ID:00097494729');
      } else if (i === 2) {
        expect(tds[1].innerHTML).toEqual('HACKERBANK1 BP DES: MERCH PMT ID:1358570');
      }
    });
  });

  it('Should not filter data when date is not selected', async () => {
    const {compiled, fixture} = factory();
    await pushValue('', fixture);
    submitBtn.click();
    const tBody = getByTestId('records-body', compiled);
    expect(tBody.children.length).toEqual(7);
    Array.from(tBody.children).forEach((node: HTMLElement, i) => {
      const tds = Array.from(node.querySelectorAll('td'));
      if (i === 0) {
        expect(tds[1].innerHTML).toEqual('THE HACKERUNIVERSITY DES: CCD+ ID:0000232343');
      } else if (i === 3) {
        expect(tds[1].innerHTML).toEqual('HACKERBANK INC. DES:CCD+ ID: 33375894749');
      }
    });
  });
});
