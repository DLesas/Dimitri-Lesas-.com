<template>
    <canvas id="title" style="position: relative; z-index:-10000"></canvas>
</template>

<script>
/* eslint-disable object-shorthand */
import Font from '~/static/Fonts/Fira Sans Medium_Regular.json'
    export default {
        data() {
            return {
                THREE : 0,
                loadedfont: 0,
                renderer: 0,
                scene: 0,
                Camera: 0,
                matLite: 0,
                geometry: 0,
                textmesh: 0,
                Font: Font,
                elementheight: 0,
                elementwidth: 0,
                aspect: 1,
                MouseX : 0,
                MouseY: 0,
                Zdistance: 0,
                length: 0,
                light: 0,
                routemapping : {
                    "" : "Homepage",
                    "About" : "Me, Myself & I",
                    "Skills" : "Skills",
                    "Contact" : "Say Hi"
                }
            }
        },
        computed: {
            primarycolor() {
                return this.$vuetify.theme.currentTheme.primary.base
            },
            route() {
                return String(this.$route.path.substring(1).replace("_", " ").replace("/", " > "))
            },
            screenheight() {
                return window.outerHeight
            },
            screenwidth() {
                return window.outerWidth
            }

        },
        watch: {
            primarycolor() {
                this.updatecolor()
            },
            route() {
                this.updatetext()
            }
        },
        mounted () {

            this.init()  

        },
        methods: {

            updatecolor () {

                this.light.color.setStyle(this.primarycolor)

            },

            updatetext () {

                this.matLite.dispose()
                this.geometry.dispose()
                this.scene.remove(this.textmesh)
                this.matLite = new this.THREE.MeshStandardMaterial({ roughness: 0.3, metalness: 0, opacity: 1, depthTest: true, depthWrite: true, side: this.THREE.DoubleSide })  
				// const message = this.route === "" ? "Homepage" : this.route === "About" ? "Me, Myself & I" : this.route; // replace text here with variable
                const message = this.routemapping[this.route] !== undefined ? this.routemapping[this.route] : this.route
                this.length = message.length
				const shapes = this.loadedfont.generateShapes( message, 100 );
				this.geometry = new this.THREE.ShapeGeometry( shapes );
				this.geometry.computeBoundingBox();
				const xMid = - 0.5 * ( this.geometry.boundingBox.max.x - this.geometry.boundingBox.min.x );
				this.geometry.translate( xMid, 0, 0 );

                this.textmesh = new this.THREE.Mesh( this.geometry, this.matLite );
                this.textmesh.geometry.computeBoundingBox();
				this.textmesh.position.z = - 150;
                const ydifference = (this.textmesh.geometry.boundingBox.max.y - this.textmesh.geometry.boundingBox.min.y)/2
                this.textmesh.position.y = -ydifference ;
				this.scene.add( this.textmesh );

            },

            init() {

                this.mouseX = (this.screenwidth/2 * 0.0)
				this.mouseY = (this.screenheight/2 * 0.0)
                this.elementheight = document.getElementById("title").parentElement.offsetHeight
                this.elementwidth = document.getElementById("title").parentElement.offsetWidth
                this.aspect = (this.elementheight / this.elementwidth) / 0.5
                this.THREE = this.$Three().THREE
                const THREE = this.THREE
                this.renderer = new THREE.WebGLRenderer( {canvas: document.getElementById("title"), antialias: true, alpha: true } );
                const Font = this.$ThreeFontLoader().Font

                this.Camera = new THREE.PerspectiveCamera(45, this.screenwidth / this.screenheight, 1, 10000 )

                this.scene = new THREE.Scene();
                this.loadedfont = new Font(this.Font);
                this.matLite = new THREE.MeshStandardMaterial({ roughness: 0.3, metalness: 0, opacity: 1, depthTest: true, depthWrite: true, side: THREE.DoubleSide })
                    
				const message = this.route === "" ? "Homepage" : this.route; // replace text here with variable
                this.length = message.length
				const shapes = this.loadedfont.generateShapes( message, 100 );
				this.geometry = new THREE.ShapeGeometry( shapes );
				this.geometry.computeBoundingBox();
				const xMid = - 0.5 * ( this.geometry.boundingBox.max.x - this.geometry.boundingBox.min.x );
				this.geometry.translate( xMid, 0, 0 );

				// make shape ( N.B. edge view not visible )

                this.textmesh = new THREE.Mesh( this.geometry, this.matLite );
                this.textmesh.geometry.computeBoundingBox();
				this.textmesh.position.z = - 150;
                const ydifference = (this.textmesh.geometry.boundingBox.max.y - this.textmesh.geometry.boundingBox.min.y)/2
                this.textmesh.position.y = -ydifference ;
				this.scene.add( this.textmesh );

                // init light

                this.light = new THREE.DirectionalLight(0xffffff, 0.7)
                this.scene.add(this.light)
                this.light.color.setStyle(this.primarycolor)


                // make line shape ( N.B. edge view remains visible )     
				this.render();
				this.renderer.setPixelRatio( window.devicePixelRatio );
				this.renderer.setSize( window.innerWidth, window.innerHeight );
                this.onWindowResize()
				window.addEventListener( 'resize', this.onWindowResize );
                // window.addEventListener( 'touchend', this.onWindowMouseMove )
                window.addEventListener( 'mousemove', this.onWindowMouseMove );

            },
            onWindowResize() {

                this.mouseX = (this.screenwidth/2 * 0.0)
			    this.mouseY = (this.screenheight/2 * 0.0)
				this.Camera.aspect = this.elementwidth / this.elementheight;
				this.Camera.updateProjectionMatrix();
				this.renderer.setSize( this.elementwidth, this.elementheight );
				this.animate();

			},

            animate() {

                requestAnimationFrame(this.animate)
                this.render()

            },

			render() {
                
                this.light.position.set(this.mouseX, this.mouseY, (60 * this.length * this.aspect));
                this.Camera.position.set( this.mouseX, this.mouseY,  (60 * this.length * this.aspect));
				this.Camera.lookAt( this.scene.position );
				this.renderer.render( this.scene, this.Camera );

			},
            onWindowMouseMove(event) {

                if (event.type === "touchmove") {
                    this.mouseX = (this.screenwidth/2) - event.touches[0].clientX ;
                    this.mouseY = (this.screenheight/2) - event.touches[0].clientY;
                }
                else {
                    this.mouseX = (this.screenwidth/2 * (0.007 * this.length)) - (event.clientX * (0.007 * this.length));
				    this.mouseY = (this.screenheight/2 * (0.01 * this.length)) - (event.clientY * (0.01 * this.length));
                }

            }

        },
    }
</script>

<style lang="scss" scoped>

</style>