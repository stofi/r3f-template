import { useEffect, useMemo } from 'react'

import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Noise,
  Vignette,
} from '@react-three/postprocessing'

import { useControls } from 'leva'

import CustomEffect from '$/effects/CustomEffect'

export default function Effects() {
  const {
    enableBloom,
    enableDepthOfField,
    enableNoise,
    enableVignette,
    enableCustomEffect,
  } = useControls('Effects', {
    enableBloom: {
      value: false,
      label: 'Bloom',
    },
    enableDepthOfField: {
      value: false,
      label: 'Depth of Field',
    },
    enableNoise: {
      value: false,
      label: 'Noise',
    },
    enableVignette: {
      value: false,
      label: 'Vignette',
    },
    enableCustomEffect: {
      value: false,
      label: 'Custom',
    },
    luminanceSmoothing: {
      value: 0.5,
      min: 0,
      max: 1,
      label: 'Smoothing',
    },
    luminanceThreshold: {
      value: 0.1,
      min: 0,
      max: 2,
      label: 'Threshold',
    },
    intensity: {
      value: 0.5,
      min: 0,
      max: 10,
      label: 'Intensity',
    },
    levels: {
      value: 1,
      min: 0,
      max: 10,
      step: 1,
      label: 'Levels',
    },
    radius: {
      value: 4,
      min: 0,
      max: 10,
      label: 'Radius',
    },
  })

  const anyEffectEnabled = useMemo(
    () =>
      enableBloom ||
      enableDepthOfField ||
      enableNoise ||
      enableVignette ||
      enableCustomEffect,
    [enableBloom, enableDepthOfField, enableNoise, enableVignette],
  )

  return anyEffectEnabled ? (
    <EffectComposer>
      {enableDepthOfField ? (
        <DepthOfField focalLength={0.02} bokehScale={20} height={1024} />
      ) : (
        <></>
      )}
      {enableBloom ? <Bloom blendFunction={2} /> : <></>}
      {enableNoise ? (
        <Noise
          blendFunction={2}
          // opacity={0.015}
        />
      ) : (
        <></>
      )}
      {enableVignette ? (
        <Vignette eskil={false} offset={0.1} darkness={0.8} />
      ) : (
        <></>
      )}
      {enableCustomEffect ? <CustomEffect param={0.1} /> : <> </>}
    </EffectComposer>
  ) : (
    <> </>
  )
}
