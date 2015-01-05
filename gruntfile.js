module.exports = function (grunt) {

	grunt.initConfig({
		uglify: {
			options: {
				beautify: true
			},
			dist: {
				files: {
					'js/main.min.js': [
						'js/plugins.js',
						'js/vektor/device.js',
						'js/vektor/devices/vektordevices.js',
						'js/vektor/devices/vdrive.js',
						'js/vektor/devices/vdrivelite.js',
						'js/vektor/devices/vfleet.js',
						'js/vektor/devices/vfleetcan.js',
						'js/vektor/devices/vmax.js',
						'js/vektor/devices/vmini.js',
						'js/vektor/devices/vmoto.js',
						'js/script.js',
					]
				}
			}
		},
		watch: {
			options: {
				nospawn: true,
				livereload: reloadPort
			},
			uglify: {
				files: ['js/**'],
				tasks: ['uglify'],
				options: { livereload: reloadPort }
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
}