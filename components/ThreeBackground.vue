
<template>
    <canvas id="background" ref="canvas" :style="dark? 'background: #121212' : ''">
    </canvas>
</template>

<script>
    export default {
    data() {
        return {
            renderer: 0,
            geo: 0,
            mat: 0,
            plane: 0,
            scene: 0,
            light1: 0,
            light2: 0,
            light3: 0,
            light4: 0,
            camera: 0,
            mousePlane: 0,
            raycaster: 0,
            mouse: 0,
            mousePosition: 0,
            THREE: 0,
            wWidth: 0,
            wHeight: 0,
            width: 0,
            height: 0,
            conf: 0,
            stop: false,
            counter: 0
        }
    },
    computed: {
        color() {
            return this.$vuetify.theme.currentTheme.primary.base
        },
        dark() {
            return this.$vuetify.theme.dark
        },
        // orient() {
            // bob
        // }
    },
    watch: {
        color(newValue) { 
            this.changecolors(newValue)
        }
    },
    mounted() {
        /* eslint-disable no-undef */
        setTimeout(() => {
            const THREE = this.$Three().THREE
            const SimplexNoise = this.$simplex().SimplexNoise
            const vue = this
            vue.THREE = THREE
        // const vue = this
        // const chroma = this.$chroma().chroma;

        
            this.conf = {
                fov: 75,
                cameraZ: 100,
                xyCoef: 50,
                zCoef: 10,
                lightIntensity: 0.9,
                ambientColor: 0x000000,
                light1Color: 0x0E09DC,
                light2Color: 0x1CD1E1,
                light3Color: 0x18C02C,
                light4Color: 0xee3bcf,
                el: document.getElementById("background")
            };

            const conf = this.conf

            const simplex = new SimplexNoise();

            vue.mouse = new vue.THREE.Vector2();
            vue.mousePlane = new vue.THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
            vue.mousePosition = new vue.THREE.Vector3();
            vue.raycaster = new vue.THREE.Raycaster();

            const r = 10;
            const y = 10;
            const lightDistance = 250;

            vue.light1 = new vue.THREE.PointLight(conf.light1Color, conf.lightIntensity, lightDistance);
            vue.light2 = new vue.THREE.PointLight(conf.light2Color, conf.lightIntensity, lightDistance);
            vue.light3 = new vue.THREE.PointLight(conf.light3Color, conf.lightIntensity, lightDistance);
            vue.light4 = new vue.THREE.PointLight(conf.light4Color, conf.lightIntensity, lightDistance);
        
            init();

            function init() {
                vue.renderer = new vue.THREE.WebGLRenderer({
                    canvas: conf.el,
                    antialias: true,
                    alpha: true
                });
                vue.camera = new vue.THREE.PerspectiveCamera(conf.fov);
                vue.camera.position.z = conf.cameraZ;
                vue.camera.position.y += 6

                vue.updateSize();
                window.addEventListener('resize', vue.updateSize, false);
                window.addEventListener("orientationchange", vue.updateSize, false);

                document.addEventListener('mousemove', e => {
                    const v = new vue.THREE.Vector3();
                    vue.camera.getWorldDirection(v);
                    v.normalize();
                    vue.mousePlane.normal = v;
                    vue.mouse.x = (e.clientX / vue.width) * 2 - 1;
                    vue.mouse.y = -(e.clientY / vue.height) * 2 + 1;
                    vue.raycaster.setFromCamera(vue.mouse, vue.camera);
                    vue.raycaster.ray.intersectPlane(vue.mousePlane, vue.mousePosition);
                });

                initScene();
                animate();
            }

            function initScene() {
                vue.scene = new THREE.Scene();
                initLights();

                // const mat = new THREE.MeshLambertMaterial({
                //    color: 0xffffff,
                //    side: THREE.DoubleSide
                // });
                // const mat = new THREE.MeshPhongMaterial({ color: 0xffffff });
                vue.mat = new THREE.MeshStandardMaterial({ roughness: 0, metalness: 0, opacity: 0.9, depthTest: true, depthWrite: true });
                vue.geo = new THREE.PlaneBufferGeometry(vue.wWidth, vue.wHeight, vue.wWidth / 2, vue.wHeight / 2);
                vue.plane = new THREE.Mesh(vue.geo, vue.mat);
                vue.scene.add(vue.plane);

                vue.plane.rotation.x = -Math.PI / 2 - 0.2;
                vue.plane.position.y = -25;
                vue.camera.position.z = 60;
            }

            function initLights() {

                // light = new THREE.AmbientLight(conf.ambientColor);
                // scene.add(light);
                // eslint-disable-next-line no-empty
                if (vue.color !== "#03a9f4") {
                    vue.changecolors(vue.color)
                }

                vue.light1.position.set(0, y, r);
                vue.scene.add(vue.light1);

                vue.light2.position.set(0, -y, -r);
                vue.scene.add(vue.light2);

                vue.light3.position.set(r, y, 0);
                vue.scene.add(vue.light3);

                vue.light4.position.set(-r, y, 0);
                vue.scene.add(vue.light4);
            }

            function animate() {
                if (vue.stop === true) {
                    return
                }
                requestAnimationFrame(animate);
                animatePlane();
                animateLights();
                vue.renderer.render(vue.scene, vue.camera);
            };

            function animatePlane() {
                const gArray = vue.plane.geometry.attributes.position.array;
                const time = Date.now() * 0.0002;
                for (let i = 0; i < gArray.length; i += 3) {
                    gArray[i + 2] = simplex.noise4D(gArray[i] / conf.xyCoef, gArray[i + 1] / conf.xyCoef, time, vue.mouse.x + vue.mouse.y) * conf.zCoef;
                }
                vue.plane.geometry.attributes.position.needsUpdate = true;
                // plane.geometry.computeBoundingSphere();
            }

            function animateLights() {
                const time = Date.now() * 0.001;
                const d = 50;
                vue.light1.position.x = Math.sin(time * 0.1) * d;
                vue.light1.position.z = Math.cos(time * 0.2) * d;
                vue.light2.position.x = Math.cos(time * 0.3) * d;
                vue.light2.position.z = Math.sin(time * 0.4) * d;
                vue.light3.position.x = Math.sin(time * 0.5) * d;
                vue.light3.position.z = Math.sin(time * 0.6) * d;
                vue.light4.position.x = Math.sin(time * 0.7) * d;
                vue.light4.position.z = Math.cos(time * 0.8) * d;
            }
        }, 0);
    },
    beforeDestroy () {
        this.stop = true
        this.scene.remove(this.plane)
        this.mat.dispose()
        this.geo.dispose()
        this.renderer.dispose()
        window.removeEventListener('resize', this.updateSize)
        window.removeEventListener("orientationchange", this.updateSize);
        // document.removeEventListener('mousemove')
    },
    destroyed () {
        setTimeout(() => {
            delete this.renderer
        }, 500); 
    },
    methods: {
        changecolors(value) {
            this.$axios.$get(`https://www.thecolorapi.com/scheme?hex=${value.replace("#", "")}&mode=analogic&count=4`)
            .then(res => {
                this.light1.color.setStyle(res.colors[0].hex.value)
                this.light2.color.setStyle(res.colors[1].hex.value)
                this.light3.color.setStyle(res.colors[2].hex.value)
                this.light4.color.setStyle(res.colors[3].hex.value)
            })
        },
        updateSize() {
            this.width = window.innerWidth < window.outerWidth && window.innerWidth !== undefined? Window.innerWidth : window.outerWidth
            this.height = window.innerHeight < window.outerHeight && window.innerHeight!== undefined ? window.innerHeight : window.outerHeight;

            console.log("changed!")
            console.log(this.width)
            console.log(this.height)
            if (this.renderer && this.camera) {
                this.renderer.setSize(this.width, this.height);
                this.camera.aspect = this.width / this.height;
                this.camera.updateProjectionMatrix();
                const wsize = this.getRendererSize();
                this.wWidth = wsize[0];
                this.wHeight = wsize[1];
            }
            if (this.width === undefined || this.height === undefined && this.counter < 10){
                
                this.updateSize()
                this.counter ++
            } else
            {
                this.counter = 0
            }
        },
        getRendererSize() {
            const cam = new this.THREE.PerspectiveCamera(this.camera.fov, this.camera.aspect);
            const vFOV = cam.fov * Math.PI / 180;
            const height = 3 * Math.tan(vFOV / 2) * Math.abs(this.conf.cameraZ);
            const width = height * cam.aspect;
            return [width, height];
        }
    },
}

</script>

<style lang="scss" scoped>
#background {
  position: absolute; height: 100vh; width: 100vh; top: 0; left: 0; z-index: -1;
}
</style>