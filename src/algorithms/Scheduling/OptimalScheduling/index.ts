import {Event} from '../types';
/**
 * Comparator for Events where the earliest completion date is first
 */
const compEvents = (a: Event, b: Event) =>  a.to.getTime() - b.to.getTime();
export function schedule(events: Event[]): Event[] {
  if (events.length <= 0) {
    return [];
  }

  // Sort events by their end date;
  const sortedEvents = events.sort(compEvents);

  // Prepare result array
  const result: Event[] = [sortedEvents[0]];
  let lastEndDate: Date = sortedEvents[0].to;

  // Start from the second element since the first one is already in results
  for(let i = 1; i < sortedEvents.length; i++) {
    const currentEvent = sortedEvents[i];

    // If current event intersects with the latest event
    // skip it
    if(lastEndDate >= currentEvent.from) {
      continue;
    }

    // Add next earliest completion date event
    // to the results list and cache last end date
    result.push(currentEvent);
    lastEndDate = currentEvent.to;
  }

  return result;
}
