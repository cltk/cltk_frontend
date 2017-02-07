node {
  def project = 'archimedes-01201'
  def appName = 'cltk-frontend'
  def feSvcName = 'cltk-frontend-serv'
  def deploymentName = 'cltk-frontend-dep'
  def appContainerName = 'cltk-frontend-cont'
	def deployArch = "os.linux.x86_64"

  checkout scm
  sh("git submodule update --init --recursive")
  sh('git describe --dirty --always > build_tag.out')
  def buildTag = readFile('build_tag.out').trim()
  def imageTag = "us.gcr.io/${project}/${appName}:${buildTag}"
	sh("sudo gcloud container clusters get-credentials cltk-frontend")

  stage('Building application:') {
	  sh("./bin/build_app")
	}

  stage('Building application image:') {
	  sh("sudo ./bin/build_image ${imageTag}")
	}

  stage('Pushing container image to registry:') {
	  sh("sudo gcloud docker push -- ${imageTag}")
	}

  stage('Deploying Application:') {
	  sh("kubectl set image deployment/${deploymentName} ${appContainerName}=${imageTag}")
		sh("echo http://`kubectl get service/${feSvcName} --output=json | jq -r '.status.loadBalancer.ingress[0].ip'` > ${feSvcName}")
	}
}
