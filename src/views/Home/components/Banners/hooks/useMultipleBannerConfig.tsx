import { useMemo } from 'react'
import shuffle from 'lodash/shuffle'
import CompetitionBanner from '../CompetitionBanner'
import IFOBanner from '../IFOBanner'
import LotteryBanner from '../LotteryBanner'
import PerpetualBanner from '../PerpetualBanner'
import useIsRenderIfoBanner from './useIsRenderIFOBanner'
import useIsRenderLotteryBanner from './useIsRenderLotteryBanner'
import useIsRenderCompetitionBanner from './useIsRenderCompetitionBanner'

/**
 * make your custom hook to control should render specific banner or not
 * add new campaign banner easily
 *
 * @example
 * ```ts
 *  {
 *    shouldRender: isRenderIFOBanner,
 *    banner: <IFOBanner />,
 *  },
 * ```
 */
export const useMultipleBannerConfig = () => {
  const isRenderIFOBanner = useIsRenderIfoBanner()
  const isRenderLotteryBanner = useIsRenderLotteryBanner()
  const isRenderCompetitionBanner = useIsRenderCompetitionBanner()

  return useMemo(
    () =>
      shuffle(
        [
          {
            shouldRender: isRenderIFOBanner,
            banner: <IFOBanner />,
          },
          {
            shouldRender: isRenderCompetitionBanner,
            banner: <CompetitionBanner />,
          },
          {
            shouldRender: isRenderLotteryBanner,
            banner: <LotteryBanner />,
          },
          {
            shouldRender: true,
            banner: <PerpetualBanner />,
          },
        ]
          .filter((d) => d.shouldRender)
          .map((d) => d.banner),
      ),
    [isRenderIFOBanner, isRenderLotteryBanner, isRenderCompetitionBanner],
  )
}
