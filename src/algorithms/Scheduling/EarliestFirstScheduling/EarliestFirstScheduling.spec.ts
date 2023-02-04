import { describe, expect, test } from 'vitest'
import {Event} from '../types';
import {schedule} from './index';

describe('EarliestFirstScheduling', () => {
  test('returns an empty array when given an empty events array', () => {
    const events: Event[] = [];
    const expectResult: Event[] = [];

    const result: Event[] = schedule(events);

    expect(result).toEqual(expectResult);
  });

  test('returns the original array when there is only one event', () => {
    const event: Event = { from: new Date(2022, 10, 10), to: new Date(2022, 10, 13) };
    const events: Event[] = [event];
    const expectResult: Event[] = [event];

    const result: Event[] = schedule(events);

    expect(result).toEqual(expectResult);
  });

  test('returns the events in order of earliest starting date first', () => {
    const eventA: Event = { from: new Date(2022, 10, 10), to: new Date(2022, 10, 13) };
    const eventB: Event = { from: new Date(2022, 10, 8), to: new Date(2022, 10, 15) };
    const eventC: Event = { from: new Date(2022, 10, 17), to: new Date(2022, 10, 20) };

    const events: Event[] = [eventB, eventC, eventA];
    const expectedResult: Event[] = [eventB, eventC];

    const result: Event[] = schedule(events);

    expect(result).toEqual(expectedResult);
  });
});
