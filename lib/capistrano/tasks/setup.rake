namespace :oja do

  desc "Build"
  task :build do
    on roles fetch(:yarn_roles) do
      within fetch(:yarn_target_path, release_path) do
        execute :echo, '$(pwd)'
        execute :ls, '-la'
        execute :yarn, :run, :build
      end
    end
  end

  after "yarn:install", "oja:build"
end

