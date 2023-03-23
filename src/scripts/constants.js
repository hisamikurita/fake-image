import { gsap } from 'gsap'
import { CustomEase } from './vendor/CustomEase'
import { hasTouchScreen } from './utility/check-device'

gsap.registerPlugin(CustomEase)
// FPS60固定
gsap.ticker.fps(60)

// ブレイクポイント
export const BREAKPOINT = 768

// アニメーション時間
export const DURASION = {
  SHORT: 0.4,
  BASE: 1.0,
  FULL: 2.0,
}

// デバイス判定
export const DEVICE = {
  isSp: () => {
    if (window.innerWidth < BREAKPOINT) return true
    else return false
  },
  TOUCH: hasTouchScreen(),
}

// イージング
export const EASING = {
  TRANSFORM: CustomEase.create('transform', 'M0,0 C0.44,0.05 0.17,1 1,1'),
  MATERIAL: CustomEase.create('material', 'M0,0 C0.26,0.16 0.1,1 1,1'),
}
