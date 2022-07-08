import { ThreeManagerCore } from '@/lib/ThreeManager'
import * as THREE from 'three'
import { GUI } from 'lil-gui'

export class FooContent {
  private gui: GUI
  private scene: THREE.Scene
  private render: (updateFn?: CallableFunction | undefined) => void

  constructor() {
    const { scene, render } = new ThreeManagerCore({
      // isHelper: true,
      isControls: true,
      // isStats: true,
    })

    this.gui = new GUI()
    this.scene = scene
    this.render = render
    this.init()
  }

  private init(): void {
    const ground = this.genShader()
    const light = this.genLight()
    this.scene.add(light, ground)
    this.render()
  }

  private genGround(): THREE.Mesh {
    const mat = new THREE.MeshLambertMaterial({ color: '#c9c9c9' })
    const geo = new THREE.BoxGeometry(22, 1, 20)
    const mesh = new THREE.Mesh(geo, mat)
    return mesh
  }

  private genShader(): THREE.Mesh {
    //バーテックスシェーダ
    const vertexShader = `

    //頂点カラーの取得
    attribute vec3 color;

    //varyingを宣言
    varying vec3 vColor;

    void main(){

        //フラグメントシェーダに頂点カラーを転送
        vColor = color;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
`

    //フラグメントシェーダ
    const fragmentShader = `

    //varyingを宣言して頂点カラーを取得
    varying vec3 vColor;

    void main(){
        gl_FragColor = vec4(vColor,1.0);
    }
`

    //型付配列で頂点座標を設定
    const positions = new Float32Array([
      2.5, 0.0, 0.0, 0, 5.0, 0.0, -2.5, 0.0, 0.0,
    ])

    //型付配列で頂点カラーを設定
    const colors = new Float32Array([
      1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0,
    ])

    //バッファーオブジェクトを生成
    const geometry = new THREE.BufferGeometry()

    //バッファーオブジェクトのattributeに頂点座標を設定
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    //バッファーオブジェクトのattributeに頂点カラーを設定
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const material = new THREE.ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      side: THREE.DoubleSide,
    })
    const mesh = new THREE.Mesh(geometry, material)
    return mesh
  }

  private genLight(): THREE.DirectionalLight {
    const lightFormat = {
      color: '#ffffff',
      posX: 18,
      posY: 20,
      posZ: 15,
      intensity: 1.5,
    }
    const directionalLight = new THREE.DirectionalLight(
      lightFormat.color,
      lightFormat.intensity,
    )
    directionalLight.position.set(
      lightFormat.posX,
      lightFormat.posY,
      lightFormat.posZ,
    )
    const folder = this.gui.addFolder('DirectionalLight')
    folder
      .addColor(lightFormat, 'color')
      .onChange((color: string) => directionalLight.color.set(color))
    folder
      .add(lightFormat, 'posX', -100, 100)
      .onChange((x: number) => (directionalLight.position.x = x))
    folder
      .add(lightFormat, 'posY', -100, 100)
      .onChange((y: number) => (directionalLight.position.y = y))
    folder
      .add(lightFormat, 'posZ', -100, 100)
      .onChange((z: number) => (directionalLight.position.z = z))
    folder
      .add(lightFormat, 'intensity', 0, 2)
      .onChange((v: number) => (directionalLight.intensity = v))
    return directionalLight
  }
}
