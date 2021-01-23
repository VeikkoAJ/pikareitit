import { Leg } from '../routeQueryTypes';

export type MappedItineraryLeg =
  | { mainQueryLeg: Leg; secondaryLegEndTime: number | undefined }
  | undefined;
/**
 * Includes the secondary destination from the secondary query if defined
 * @param mainItineraryLegs
 * @param secondaryItineraryLegs
 */
export const MapSecondaryDestinationTimes = (
  mainItineraryLegs: (Leg | undefined)[],
  secondaryItineraryLegs: (Leg | undefined)[] | undefined
): MappedItineraryLeg[] =>
  mainItineraryLegs.map((mainLeg, i) => {
    if (mainLeg === undefined) {
      return undefined;
    }
    if (
      secondaryItineraryLegs === undefined ||
      secondaryItineraryLegs[i] === undefined ||
      secondaryItineraryLegs[i]?.endTime === undefined
    ) {
      return { mainQueryLeg: mainLeg, secondaryLegEndTime: undefined };
    }
    return {
      mainQueryLeg: mainLeg,
      secondaryLegEndTime: secondaryItineraryLegs[i]?.endTime,
    };
  });
