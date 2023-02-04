import {Event} from '../types';


/**
 * Check if events are overlaping
 */
const areEventsOverlap = (a: Event, b: Event) => (Number(a.from) < Number(b.from) && Number(b.from) < Number(a.to)) ||
    (Number(a.from) < Number(b.to)   && Number(b.to)   < Number(a.to)) ||
    (Number(b.from) <  Number(a.from) && Number(a.to)   <  Number(b.to));
/**
 * Comparator for Events where the shortest completion date is first
 */
const compEvents = (a: Event, b: Event) => getEventLength(a.from, b.to) - getEventLength(a.from, a.to);

/**
 * Calculate event length
 */
const getEventLength = (start: Date, end: Date) => start.getTime() - end.getTime()

/**
 * Generates an Events schedules favouring the shortest event
 */
export function schedule(events: Event[]) {
  if (events.length <= 0) {
    return [];
  }

  // Sort events by their length
  let sortedEvents = events.sort(compEvents);

  // Prepare result array
  const result: Event[] = [];

  do {
    // Cache and add next shortest event as next result
    const lastResult = sortedEvents.shift()!;
    result.push(lastResult);

    // Remove events that are overlapping with last result
    sortedEvents = sortedEvents.filter((event) => !areEventsOverlap(lastResult, event));
  } while(sortedEvents.length > 0)

  return result;
}
